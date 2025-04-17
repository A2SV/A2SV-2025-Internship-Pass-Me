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
    <div className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden bg-[#1A1A1A] text-white">
      <div className="flex justify-center items-center py-4">
        <div>
          <Image
            src="/banner.png"
            alt="A2SV Translator Banner"
            width={333}
            height={62}
            className="md:w-152 md:h-25 object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col h-full px-8 pb-4 relative overflow-hidden">
        {/* Header with language selection */}
        <div className="flex justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm mb-1">From</span>
            <div className="bg-[#5D5D6D] text-white rounded-md p-3 w-[240px] flex justify-between items-center">
              <span>English</span>
              <span>▼</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm mb-1">To:</span>
            <div className="bg-[#5D5D6D] text-white rounded-md p-3 w-[240px] flex justify-between items-center">
              <span>Amharic</span>
              <span>▼</span>
            </div>
          </div>
        </div>

        {/* Date selection - as shown in the UI */}
        <div className="mb-6">
          <span className="text-gray-400 text-sm block mb-1">
            Choose your date of flight
          </span>
          <div className="bg-[#5D5D6D] text-white rounded-md p-3 w-[240px] flex justify-between items-center">
            <span>Wednesday, 11th January</span>
            <span>▼</span>
          </div>
        </div>

        {/* Conversation messages - Only this part should be scrollable */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4">
          {selectedConversation.messages.map((message) => (
            <div key={message.id} className="space-y-4">
              {/* Question box - #26252A background - Left aligned */}
              <div className="w-full flex justify-start">
                <div className="w-[344px] h-[93px] rounded-[10px] p-[7px] bg-[#26252A] flex flex-col gap-[11px]">
                  <div className="flex items-start">
                    <span className="text-blue-400 mr-2">
                      {message.questionNumber}.
                    </span>
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        <span className="text-gray-300">Question:</span>
                        <span className="ml-2">{message.question}</span>
                      </div>
                      {message.questionTranslated && (
                        <div className="text-gray-400 text-sm mt-1">
                          <span className="text-gray-500">ጥያቄ:</span>
                          <span className="ml-2">
                            {message.questionTranslated}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Answer box - #323232 background - Right aligned */}
              {message.answer && (
                <div className="w-full flex justify-end">
                  <div className="w-[344px] h-[93px] rounded-[10px] p-[7px] bg-[#323232] flex flex-col gap-[11px]">
                    <div className="text-white">
                      <span className="text-gray-300">Answer:</span>
                      <span className="ml-2">{message.answer}</span>
                    </div>
                    {message.answerTranslated && (
                      <div className="text-gray-400 text-sm mt-1">
                        <span className="text-gray-500">መልስ:</span>
                        <span className="ml-2">{message.answerTranslated}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message.isActive && !message.answer && (
                <div className="w-full flex justify-end">
                  <div className="w-[344px] h-[93px] rounded-[10px] p-[7px] bg-[#323232] flex flex-col gap-[11px]">
                    <div className="text-gray-400">
                      Placeholder for active message
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Use Chat button with specified dimensions */}
        <div className="absolute bottom-4 right-8">
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
