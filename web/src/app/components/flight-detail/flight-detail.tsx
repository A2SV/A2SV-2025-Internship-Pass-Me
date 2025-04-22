"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetFlightQuery } from "@/app/services/flightsApi";


export default function FlightDetail({ flightId }: { flightId: string }) {
  const router = useRouter();
  const {data, isLoading} = useGetFlightQuery(flightId)

  // Find the selected conversation based on the flightId
  const selectedConversation = data?.qa

  if (!selectedConversation && isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center h-full relative bg-[#1A1A1A] text-white">
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
        <p className="text-gray-400">
          Loading ...
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
          {selectedConversation?.map((message, idx) => (
            <div key={idx} className="flex flex-col space-y-4">
              {/* Question bubble */}
              <div className="flex flex-col max-w-md self-start space-y-1">
                <span className="text-sm text-gray-400">
                  Question:
                </span>
                <div className="rounded-lg px-4 py-2 bg-[#26252A] text-sm whitespace-pre-wrap">
                  <p>{message.question}</p>
                  {message.question && (
                    <div className="mt-2 text-blue-50">
                      <strong>ጥያቄ:</strong>
                      <p>{message.question}</p>
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
                    {message.answer && (
                      <div className="mt-2 text-blue-50">
                        <strong>መልስ:</strong>
                        <p>{message.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ): null}
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
