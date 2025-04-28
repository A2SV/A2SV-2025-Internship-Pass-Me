from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
from dotenv import load_dotenv
import openai
import whisper
import os
from pyngrok import ngrok
from flask_cors import CORS
import json
import base64
from io import BytesIO
import uuid

# Load environment variables
load_dotenv()

# Initialize Flask
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up OpenAI client
openai.api_key = os.getenv("API_KEY")

# MongoDB setup
mongo_uri = os.getenv("MONGO_URI")
client_mongo = MongoClient(mongo_uri)
db = client_mongo["passme"]
flight_collection = db["flights"]

# Whisper model
model = whisper.load_model("base")

@app.route("/chat-ai", methods=["POST"])
def handle_chat():
    flight_id = request.form.get("flight_id")
    if 'audio' not in request.files or not flight_id:
        return jsonify({"error": "Missing audio file or flight ID"}), 400

    audio_file = request.files['audio']
    audio_path = f"uploads/{audio_file.filename}"
    os.makedirs("uploads", exist_ok=True)
    audio_file.save(audio_path)

    try:
        # Step 1: Transcribe voice to English
        result = model.transcribe(audio_path)
        officer_question_en = result["text"]
        print("officer_question_en:", officer_question_en)

        # Step 2: Get flight info from MongoDB
        flight = flight_collection.find_one({"_id": flight_id})
        if not flight:
            return jsonify({"error": "Flight not found"}), 404
        if not flight.get("language"):
            return jsonify({"error": "Language missing in flight info"}), 400

        language = flight["language"]

        # Step 3: Prepare AI prompt
        prompt = f"""
You are a multilingual travel assistant helping a traveler during immigration at an airport. Based on the flight information provided below, answer the officer's question as accurately and appropriately as possible using only relevant information.

If the question cannot be answered from the given flight info, politely say that and ask the user to provide an answer.

### Flight Info:
{flight}
The title is the purpose or objective of the flight.

### Officer's Question:
{officer_question_en}

### Your task:
- Analyze the officer's question and provide a clear and concise response in English.
- Then, translate the officer's question and the answer into {language}.
- Provide the phonetic pronunciation of the English answer written in {language} script only.

Your response should be like below:

{{
    "question": {{
        "main": "<officer_question_en>",
        "translated": "<translated officer question in {language}>"
    }},
    "answer": {{
        "main": "<answer in English>",
        "translation": "<translated answer in {language}>",
        "pronounciation": "<phonetic pronunciation of English answer written using {language} characters>"
    }}
}}

Important:
- Do not include any other text or characters in your response.
- Only provide the phonetic pronunciation of the English answer in the {language} script.
- The pronunciation should be in the {language} script for example if answer main is "I am here for a business conference." pronounciation should be "አይ አም ሄር ፎር አ ቢዝነስ ኮንፈረንስ።".

### Example Output (for Amharic language):
{{
    "question": {{
        "main": "What is the purpose of your visit?",
        "translated": "የጉብኝትዎ አላማ ምንድን ነው?"
    }},
    "answer": {{
        "main": "I am here for a business conference.",
        "translation": "ለንግድ ኮንፈረንስ ነው የመጣሁት።",
        "pronounciation": "አይ አም ሄር ፎር አ ቢዝነስ ኮንፈረንስ።"
    }}
}}

### Example Output (for Turkish language):
{{
    "question": {{
        "main": "What is the purpose of your visit?",
        "translated": "Ziyaretinizin amacı nedir?"
    }},
    "answer": {{
        "main": "I am here for a business conference.",
        "translation": "İş konferansı için buradayım。",
        "pronounciation": "ay em hir for a biznis konferans"
    }}
}}
"""

        # Step 4: Send to OpenAI
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )

        # Parse the response
        ai_reply = response.choices[0].message.content
        ai_reply = ai_reply.replace("\\n", "\n")
        
        try:
            parsed_content = json.loads(ai_reply)
            # Step 5: Generate audio for answer.main
            answer_main = parsed_content.get("answer", {}).get("main", "")
            audio_base64 = ""
            audio_path = ""
            if answer_main:
                # Use OpenAI TTS to generate audio
                tts_response = openai.audio.speech.create(
                    model="tts-1",
                    voice="alloy",
                    input=answer_main
                )
                # Save audio to a BytesIO buffer
                audio_buffer = BytesIO()
                for chunk in tts_response.iter_bytes():
                    audio_buffer.write(chunk)
                
                # Generate a unique filename for the audio
                audio_filename = f"audio_{flight_id}_{uuid.uuid4().hex}.mp3"
                audio_folder = "audios"
                audio_path = os.path.join(audio_folder, audio_filename)
                os.makedirs(audio_folder, exist_ok=True)
                
                # Save audio to file
                audio_buffer.seek(0)
                with open(audio_path, "wb") as f:
                    f.write(audio_buffer.read())
                
                # Verify the saved file is not empty
                if os.path.getsize(audio_path) == 0:
                    raise Exception("Saved audio file is empty")
                
                # Encode audio as base64 for response
                audio_buffer.seek(0)
                audio_base64 = base64.b64encode(audio_buffer.read()).decode('utf-8')
                
                # Verify base64 string is valid
                try:
                    base64.b64decode(audio_base64)
                except Exception as e:
                    raise Exception(f"Base64 encoding error: {str(e)}")

            # Step 6: Create response with base64 audio
            formatted_content = {
                "question": parsed_content.get("question", {}),
                "answer": parsed_content.get("answer", {}),
                "audio": audio_base64  # Base64-encoded audio
            }
            json_response = json.dumps(formatted_content, ensure_ascii=False, indent=2)

            return Response(
                json_response,
                content_type='application/json; charset=utf-8',
                headers={'Content-Type': 'application/json; charset=utf-8'}
            )
        except json.JSONDecodeError:
            return jsonify({"error": "Failed to parse AI response"}), 500
        except Exception as e:
            return jsonify({"error": f"Audio processing error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(audio_path) and audio_path.startswith("uploads/"):
            os.remove(audio_path)

# Set up ngrok for exposing the Flask app
ngrok.set_auth_token("2va6EHPOABbjvP2wooI23x157DY_8yRGQtmqXTCu5xpbeBMm")
public_url = ngrok.connect(5000)
print(f"🌍 Your public endpoint is: {public_url}")

if __name__ == "__main__":
    app.run(port=5000)