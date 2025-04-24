'use client'
import React, { useState } from 'react'
import { useSendManualAnswerMutation } from '@/app/services/manualChatApi'

export interface ChatItem {
  id: number
  role: 'question' | 'answer'
  text: string
  translation?: string
  transliteration?: string
}

interface ChatBubbleProps {
  chatItem: ChatItem
  isLatest?: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ chatItem, isLatest = false }) => {
  const isQuestion = chatItem.role === 'question'

  const [approved, setApproved] = useState(!isLatest)
  const [isEditing, setIsEditing] = useState(false)
  const [answerText, setAnswerText] = useState(chatItem.text)
  const [customAnswer, setCustomAnswer] = useState('')
  const [transliterationText, setTransliterationText] = useState(chatItem.transliteration || '')
  const [loading, setLoading] = useState(false)

  const [sendManualAnswer, { isLoading: isTranslating }] = useSendManualAnswerMutation()

  const handleApprove = () => {
    setApproved(true)
  }

  const handleReject = () => {
    setIsEditing(true)
  }

  const handleSubmitCustom = async () => {
    const text = customAnswer.trim()
    if (!text) return

    setLoading(true)
    try {
      const raw = (await sendManualAnswer(text).unwrap()).ai_reply

      const transMatch = raw.match(/1\.\s*Translation:\s*([^\r\n]+)/)
      const pronMatch  = raw.match(/2\.\s*Pronunciation:\s*([^\r\n]+)/)

      const newTranslation   = transMatch   ? transMatch[1].trim() : raw
      const newPronunciation = pronMatch    ? pronMatch[1].trim()  : ''

      setAnswerText(newTranslation)
      setTransliterationText(newPronunciation)
      setApproved(true)
    } catch (error) {
      console.error('Error translating custom answer:', error)
    } finally {
      setLoading(false)
      setIsEditing(false)
      setCustomAnswer('')
    }
  }

  return (
    <div className={`flex flex-col max-w-md ${
      isQuestion
        ? isEditing ? 'self-center w-300' : 'self-start'
        : 'self-end'
    }`}>
      <span className={`text-sm mb-1 ${
        isQuestion ? 'text-gray-400' : 'text-green-100'
      }`}>
        {isQuestion ? 'Question:' : 'Answer:'}
      </span>

      <div className={`rounded-lg px-4 py-2 ${
        isEditing ? 'bg-indigo-500 w-100'
        : isQuestion ? 'bg-[#26252A]' : 'bg-[#323232]'
      } text-sm relative`}>
        {isQuestion ? (
          <>
            <p className="whitespace-pre-wrap">{chatItem.text}</p>
            {chatItem.translation && (
              <div className="mt-2 text-blue-50">
                <strong>Translation:</strong>
                <p>{chatItem.translation}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="whitespace-pre-wrap">{answerText}</p>
            {transliterationText && (
              <div className="mt-2 text-blue-50">
                <strong>Answer:</strong>
                <p>{transliterationText}</p>
              </div>
            )}
            {isEditing && (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 rounded border border-gray-400 bg-zinc-800"
                  value={customAnswer}
                  onChange={(e) => setCustomAnswer(e.target.value)}
                  placeholder="Type your desired answer..."
                  rows={1}
                />
                <button
                  onClick={handleSubmitCustom}
                  disabled={loading || isTranslating}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  {loading || isTranslating ? 'Translating...' : 'Submit'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isLatest && !approved && !isEditing && (
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
          <button
            onClick={handleApprove}
            title="Approve Answer"
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-lg rounded-md"
          >
            &#10003;
          </button>
          <button
            onClick={handleReject}
            title="Reject & Edit Answer"
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-lg rounded-md"
          >
            &#10005;
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatBubble
