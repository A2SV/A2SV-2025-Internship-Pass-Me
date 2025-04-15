'use client'
import { useState } from 'react'
import LanguageSelector from '@/app/components/chatpage/LanguageSelector'
import ChatBubble from '@/app/components/chatpage/ChatBubble'
import Image from 'next/image'

export default function ChatPage() {
  // Mock chat data
  const [chatData, setChatData] = useState([
    {
      role: 'question',
      text: 'What is the purpose of your visit?',
      translation: 'እንተ ምን ተግባር ነው የእርስዎ ጉብኝት?',
    },
    {
      role: 'answer',
      text: 'I am here for a medical conference.',
      transliteration: 'እኔ እዚህ ለህክምና ስብሰባ ነኝ.',
    },
    {
      role: 'question',
      text: 'How long do you plan to stay?',
      translation: 'እንደው ዝግጅት ነው ልቆይ?',
    },
    {
      role: 'answer',
      text: 'I plan to stay for 15 days.',
      transliteration: 'እባክህ 15 ቀናት ነው የምቆይው.',
    },
  ])

  return (
    <div className="realtive flex flex-col min-h-screen bg-gray-950 text-white">
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
          {chatData.map((chatItem, index) => (
            <ChatBubble key={index} chatItem={chatItem} />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-5 p-4 flex justify-center items-center w-full">
        <button
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 focus:outline-none transition"
        >
          <Image src="/mic.svg" alt="Mic" height={30} width={30} />
        </button>
      </footer>
    </div>
  )
}
