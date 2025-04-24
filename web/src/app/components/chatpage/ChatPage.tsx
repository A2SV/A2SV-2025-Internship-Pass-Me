"use client";
import { useState } from "react";
import LanguageSelector from "@/app/components/chatpage/LanguageSelector";
import ChatBubble, { ChatItem } from "@/app/components/chatpage/ChatBubble";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import AudioRecorder from "@/app/components/chatpage/AudioRecorder";
import { ChatResponse } from "@/app/services/chatApi";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId") ?? "";

  const [chatData, setChatData] = useState<ChatItem[]>([]);

  const handleNewReply = (resp: ChatResponse) => {
    const baseId = chatData.length;
    const items: ChatItem[] = [
      {
        id: baseId + 1,
        role: "question",
        text: resp.question.main,
        translation: resp.question.Translated,
      },
      {
        id: baseId + 2,
        role: "answer",
        text: resp.answer.main,
        transliteration: resp.answer.Pronounciation,
      },
    ];
    setChatData((prev) => [...prev, ...items]);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#1C1C1C] text-white">
      <header className="flex items-center justify-center py-4">
        <Image
          src="/banner.png"
          alt="A2SV Translator Banner"
          width={333}
          height={62}
          className="md:w-[400px] md:h-auto object-contain"
          priority
        />
      </header>

      <main className="flex-grow px-6 py-4 overflow-auto pb-20">
        <div className="max-w-3xl mx-auto flex justify-between mb-10">
          <LanguageSelector label="From" initialLanguage="English" />
          <LanguageSelector label="To" initialLanguage="Amharic" />
        </div>

        {chatData.length > 0 ? (
          <div className="max-w-3xl mx-auto flex flex-col space-y-4">
            {chatData.map((chatItem) => (
              <ChatBubble
                key={chatItem.id}
                chatItem={chatItem}
                isLatest={chatItem.id === chatData.length}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative overflow-hidden w-[48px] h-[48px] rounded-[8px] mb-8">
              <Image
                src="/messages.png"
                alt="Messages icon"
                width={48}
                height={48}
                className="object-cover"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px]">
              When you’re ready, tap Record to capture the question you’ll ask, tap Record again to stop and retrieve the AI’s answer, then confidently record your own response to that generated reply.
            </p>
          </div>
        )}
      </main>

      <AudioRecorder flightId={flightId} onNewReply={handleNewReply} />
    </div>
  );
}
