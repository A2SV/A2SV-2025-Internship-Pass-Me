"use client";
import { useState } from "react";
import LanguageSelector from "@/app/components/chatpage/LanguageSelector";
import ChatBubble, { ChatItem } from "@/app/components/chatpage/ChatBubble";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import AudioRecorder from "@/app/components/chatpage/AudioRecorder";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get('flightId') ?? "";

  // Chat history state: will hold structured AI replies
  const [chatData, setChatData] = useState<ChatItem[]>([]);

  // Parser: convert ai_reply string into ChatItem[]
  const parseAiReply = (ai_reply: string): ChatItem[] => {
    const lines = ai_reply.split(/\r?\n/);
    let qEng = '';
    let qAmh = '';
    let aEng = '';
    let aAmh = '';
    const items: ChatItem[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('1.') && trimmed.includes('Officer Question (English):')) {
        qEng = trimmed.split('Officer Question (English):')[1].trim();
      } else if (trimmed.startsWith('3.') && trimmed.includes('Officer Question (Amharic):')) {
        qAmh = trimmed.split('Officer Question (Amharic):')[1].trim();
      } else if (trimmed.startsWith('2.') && trimmed.includes('Answer (English):')) {
        aEng = trimmed.split('Answer (English):')[1].trim();
      } else if (trimmed.startsWith('4.') && trimmed.includes('Answer (Amharic):')) {
        aAmh = trimmed.split('Answer (Amharic):')[1].trim();
      }
    }

    // push question with translation
    if (qEng) {
      items.push({ id: items.length + 1, role: 'question', text: qEng, translation: qAmh });
    }
    // push answer with transliteration
    if (aEng) {
      items.push({ id: items.length + 1, role: 'answer', text: aEng, transliteration: aAmh });
    }

    return items;
  };

  // Handler to add new reply from AudioRecorder
  const handleNewReply = (reply: string) => {
    const parsed = parseAiReply(reply);
    setChatData(prev => [...prev, ...parsed]);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#1C1C1C] text-white">
      <header className="flex items-center justify-center py-4">
        <Image
          src="/banner.png"
          alt="A2SV Translator Banner"
          width={200}
          height={50}
          className="w-65 h-12 md:w-83 md:h-16 object-fit"
          priority
        />
      </header>

      <main className="flex-grow px-6 py-4 overflow-auto pb-20">
        <div className="max-w-3xl mx-auto flex justify-between mb-10">
          <LanguageSelector label="From" initialLanguage="English" />
          <LanguageSelector label="To" initialLanguage="Amharic" />
        </div>

        {chatData.length > 0 ? (<div className="max-w-3xl mx-auto flex flex-col space-y-4">
          {chatData.map((chatItem) => (
            <ChatBubble
              key={chatItem.id}
              chatItem={chatItem}
              isLatest={chatItem.id === chatData.length}
            />
          ))}
        </div>) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Message Icon */}
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

            {/* Text content */}
            <p className="font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px]">
              Start you converstion with the interviwer by recording what question you are asking, press the recording button again to stop recording get your answer and answer proudly!!!
            </p>
          </div>
        )}
      </main>

      <AudioRecorder flightId={flightId} onNewReply={handleNewReply} />
    </div>
  );
}