"use client";
import { useState } from "react";
import LanguageSelector from "@/app/components/chatpage/LanguageSelector";
import ChatBubble, { ChatItem } from "@/app/components/chatpage/ChatBubble";
import Image from "next/image";
import AudioRecorder from "@/app/components/chatpage/AudioRecorder";

export default function ChatPage() {
  const [chatData] = useState<ChatItem[]>([
    {
      id: 1,
      role: "question",
      text: "What is the purpose of your visit?",
      translation: "እንተ ምን ተግባር ነው የእርስዎ ጉብኝት?",
    },
    {
      id: 2,
      role: "answer",
      text: "I am here for a medical conference.",
      transliteration: "እኔ እዚህ ለህክምና ስብሰባ ነኝ.",
    },
    {
      id: 3,
      role: "question",
      text: "How long do you plan to stay?",
      translation: "እንደው ዝግጅት ነው ልቆይ?",
    },
    {
      id: 4,
      role: "answer",
      text: "I plan to stay for 15 days.",
      transliteration: "እባክህ 15 ቀናት ነው የምቆይው.",
    },
  ]);

  return (
    <div className="realtive flex flex-col min-h-screen bg-[#1C1C1C] text-white">
      <header className="flex items-center justify-center py-4 px-0">
        <Image
          src="/banner.png"
          alt="A2SV Translator Banner"
          width={200}
          height={50}
          className="min-w-70 md:w-83 h-16 object-fit"
          priority
        />
      </header>
      <main className="flex-grow px-6 py-4 overflow-auto">
        <div className="max-w-3xl mx-auto flex justify-between mb-10">
          <LanguageSelector label="From" initialLanguage="English" />
          <LanguageSelector label="To" initialLanguage="Amharic" />
        </div>
        <div className="max-w-3xl mx-auto flex flex-col space-y-4">
          {chatData.map((chatItem) => (
            <ChatBubble
              key={chatItem.id}
              chatItem={chatItem}
              isLatest={chatItem.id === 4}
            />
          ))}
        </div>
      </main>

      <AudioRecorder />
    </div>
  );
}
