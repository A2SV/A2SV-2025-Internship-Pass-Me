import React from 'react'

interface ChatItem {
  role: 'question' | 'answer'
  text: string
  translation?: string
  transliteration?: string
}

interface ChatBubbleProps {
  chatItem: ChatItem
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ chatItem }: {chatItem: ChatItem}) => {
  const isQuestion = chatItem.role === 'question'

  return (
    <div
      className={`
        flex flex-col max-w-md
        ${isQuestion ? 'self-start' : 'self-end'}
      `}
    >
      {/* Label: Question / Answer */}
      <span
        className={`
          text-sm mb-1 
          ${isQuestion ? 'text-gray-400' : 'text-green-100'}
        `}
      >
        {isQuestion ? 'Question:' : 'Answer:'}
      </span>

      {/* Main Bubble */}
      <div
        className={`
          rounded-lg px-4 py-2 
          ${isQuestion ? 'bg-zinc-800' : 'bg-zinc-700'} 
          text-sm
        `}
      >
        <p className="whitespace-pre-wrap">{chatItem.text}</p>
        {isQuestion && chatItem.translation && (
          <div className="mt-2 text-blue-50">
            <strong>Translation:</strong>
            <p>{chatItem.translation}</p>
          </div>
        )}
        {!isQuestion && chatItem.transliteration && (
          <p className="mt-2 text-blue-50">
            <strong>Answer</strong>
            <p>{chatItem.transliteration}</p>
          </p>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
