"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// Types
interface ConversationMessage {
  id: string;
  questionNumber?: number;
  question: string;
  questionTranslated?: string;
  answer?: string;
  answerTranslated?: string;
  isActive?: boolean;
}

interface FlightConversation {
  flightId: string;
  messages: ConversationMessage[];
}

// Mock conversation data
const mockConversations: FlightConversation[] = [
  {
    flightId: "1", // My First Trip to USA
    messages: [
      {
        id: "1-1",
        questionNumber: 1,
        question: "What is the purpose of your visit?",
        questionTranslated: "የጉዞዎ ዓላማ ምንድን ነው?",
        answer: "I'm visiting for a business conference.",
        answerTranslated: "ለንግድ ስብሰባ እየጎበኘሁ ነው።",
      },
      {
        id: "1-2",
        questionNumber: 2,
        question: "How long do you plan to stay?",
        questionTranslated: "ምን ያህል ጊዜ ለመቆየት እቅድ አለዎት?",
        answer: "I plan to stay for 10 days.",
        answerTranslated: "ለ10 ቀናት ለመቆየት እቅድ አለኝ።",
      },
      {
        id: "1-3",
        questionNumber: 3,
        question: "Where will you be staying?",
        questionTranslated: "የት ነው የሚቆዩት?",
        answer: "I'll be staying at a hotel in New York.",
        answerTranslated: "በኒው ዮርክ ሆቴል ውስጥ እቆያለሁ።",
      },
    ],
  },
  {
    flightId: "2", // Family Trip
    messages: [
      {
        id: "2-1",
        questionNumber: 1,
        question: "What is the purpose of your visit?",
        questionTranslated: "የጉዞዎ ዓላማ ምንድን ነው?",
        answer: "We're going on a family vacation.",
        answerTranslated: "ለቤተሰብ እረፍት እየሄድን ነው።",
      },
      {
        id: "2-2",
        questionNumber: 2,
        question: "How long do you plan to stay?",
        questionTranslated: "ምን ያህል ጊዜ ለመቆየት እቅድ አለዎት?",
        answer: "I plan to stay for 15 days.",
        answerTranslated: "ለ15 ቀናት ለመቆየት እቅድ አለኝ።",
      },
      {
        id: "2-3",
        questionNumber: 3,
        question: "Where will you be staying?",
        questionTranslated: "የት ነው የሚቆዩት?",
        answer: "I'll be staying at a hotel in D.C.",
        answerTranslated: "በዲሲ ሆቴል ላይ እቆያለሁ።",
      },
      {
        id: "2-4",
        questionNumber: 4,
        question: "Do you have a return ticket?",
        questionTranslated: "የመመለሻ ቲኬት አለዎት?",
        answer: "Yes, I have a return ticket for January 30th.",
        answerTranslated: "አዎ፣ ለጃንዋሪ 30 የመመለሻ ቲኬት አለኝ።",
      },
      {
        id: "2-5",
        questionNumber: 5,
        question: "Do you have a return ticket?",
        questionTranslated: "የመመለሻ ቲኬት አለዎት?",
      },
    ],
  },
  {
    flightId: "3", // Pick up the package ordered online
    messages: [
      {
        id: "3-1",
        questionNumber: 1,
        question: "What is the purpose of your visit?",
        questionTranslated: "የጉዞዎ ዓላማ ምንድን ነው?",
        answer: "I'm picking up a package I ordered online.",
        answerTranslated: "በመስመር ላይ ያዘዝኩትን ጥቅል እወስዳለሁ።",
      },
      {
        id: "3-2",
        questionNumber: 2,
        question: "How long do you plan to stay?",
        questionTranslated: "ምን ያህል ጊዜ ለመቆየት እቅድ አለዎት?",
        answer: "I plan to stay for 3 days.",
        answerTranslated: "ለ3 ቀናት ለመቆየት እቅድ አለኝ።",
      },
      {
        id: "3-3",
        questionNumber: 3,
        question: "Where will you be staying?",
        questionTranslated: "የት ነው የሚቆዩት?",
        answer: "I'll be staying with a friend in Shanghai.",
        answerTranslated: "በሻንጋይ ከጓደኛዬ ጋር እቆያለሁ።",
      },
    ],
  },
];

// Flight Detail Component
export default function FlightDetail({ flightId }: { flightId: string }) {
  const router = useRouter();

  // Find the selected conversation based on the flightId
  const selectedConversation = mockConversations.find(
    (conv) => conv.flightId === flightId
  );

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1A1A1A] text-white">
        <p className="text-gray-400">
          Flight not found or no conversation history available
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1A1A1A] text-white overflow-y-auto">
      {/* Banner at the top, horizontally centered */}
      <div className="flex justify-center items-center py-4 sticky top-0 bg-[#1A1A1A] z-10">
        <Image
          src="/banner.png"
          alt="A2SV Translator Banner"
          width={333}
          height={62}
          className="md:w-[400px] md:h-auto object-contain"
          priority
        />
      </div>

      <div className="px-8 pb-20 relative">
        {/* Date selection - as shown in the UI */}
        <div className="mb-8">
          <span className="text-gray-400 text-sm block mb-1">
            Your date of flight
          </span>
          <div className="bg-[#5D5D6D] text-white rounded-md p-3 w-[240px] flex justify-between items-center">
            <span>Wednesday, 11th January</span>
          </div>
        </div>

        {/* Conversation messages */}
        <div className="max-w-3xl mx-auto flex flex-col space-y-4">
          {selectedConversation.messages.map((message) => (
            <div key={message.id} className="flex flex-col space-y-4">
              {/* Question bubble */}
              <div className="flex flex-col max-w-md self-start space-y-1">
                <span className="text-sm text-gray-400">
                  {message.questionNumber}. Question:
                </span>
                <div className="rounded-lg px-4 py-2 bg-[#26252A] text-sm whitespace-pre-wrap">
                  <p>{message.question}</p>
                  {message.questionTranslated && (
                    <div className="mt-2 text-blue-50">
                      <strong>ጥያቄ:</strong>
                      <p>{message.questionTranslated}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Answer bubble */}
              {message.answer ? (
                <div className="flex flex-col max-w-md self-end space-y-1">
                  <span className="text-sm text-green-100">Answer:</span>
                  <div className="rounded-lg px-4 py-2 bg-[#323232] text-sm whitespace-pre-wrap">
                    <p>{message.answer}</p>
                    {message.answerTranslated && (
                      <div className="mt-2 text-blue-50">
                        <strong>መልስ:</strong>
                        <p>{message.answerTranslated}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : message.isActive ? (
                <div className="flex flex-col max-w-md self-end space-y-1">
                  <span className="text-sm text-gray-400">Answer:</span>
                  <div className="rounded-lg px-4 py-2 bg-[#323232] text-sm">
                    <div className="text-gray-400">Placeholder for active message</div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {/* Use Chat button with specified dimensions */}
        <div className="fixed bottom-4 right-8">
          <button
            onClick={() => router.push("/dashboard/chat")}
            className="w-[227px] h-[61px] bg-[#3972FF] hover:bg-blue-600 text-white rounded-[10px] px-[65px] py-[8px] gap-[8px] flex items-center justify-center"
          >
            Use Chat
          </button>
        </div>
      </div>
    </div>
  );
}
