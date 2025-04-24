'use client'
import React, { useState } from 'react'
import { useSendManualAnswerMutation } from '@/app/services/manualChatApi'

export interface ChatItem {
  id: number
  role: 'question' | 'answer'
  text: string
  translation: string
  transliteration?: string
}

interface ChatBubbleProps {
  chatItem: ChatItem
  isLatest?: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ chatItem, isLatest = false }) => {
  const isQuestion = chatItem.role === 'question'

  // state for manual editing
  const [approved, setApproved] = useState(!isLatest)
  const [isEditing, setIsEditing] = useState(false)
  const [customAnswer, setCustomAnswer] = useState('')

  // for display after manual translation
  const [userAnswer, setUserAnswer] = useState<string | null>(null)
  const [translatedAnswer, setTranslatedAnswer] = useState<string>(
    chatItem.translation || ''
  )
  const [pronunciationAnswer, setPronunciationAnswer] = useState<string>('')

  const [sendManualAnswer, { isLoading: isTranslating }] = useSendManualAnswerMutation()

  const handleApprove = () => {
    setApproved(true)
  }

  const handleReject = () => {
    setIsEditing(true)
  }

  const handleSubmitCustom = async () => {
    const input = customAnswer.trim()
    if (!input) return

    try {
      const { translation, pronunciation } = await sendManualAnswer(input).unwrap()
      setUserAnswer(input)
      setTranslatedAnswer(translation)
      setPronunciationAnswer(pronunciation)
      setApproved(true)
    } catch (err) {
      console.error('Error translating custom answer:', err)
    } finally {
      setIsEditing(false)
      setCustomAnswer('')
    }
  }

  const mainText = isQuestion ? chatItem.text : userAnswer ?? chatItem.text
  const translationText = isQuestion
    ? chatItem.translation
    : translatedAnswer

  return (
    <div className={`flex flex-col max-w-md ${isQuestion ? 'self-start' : 'self-end'}`}>
      <span className={`text-sm mb-1 ${isQuestion ? 'text-gray-400' : 'text-green-100'}`}>
        {isQuestion ? 'Question:' : 'Answer:'}
      </span>

      <div className={`rounded-lg px-4 py-2 ${isQuestion ? 'bg-[#26252A]' : 'bg-[#323232]'} text-sm relative`}>
        <p className="whitespace-pre-wrap">{mainText}</p>

        {translationText && (
          <div className="mt-2 text-blue-50">
            <strong>{isQuestion ? 'Translation:' : 'Translation:'}</strong>
            <p>{translationText}</p>
          </div>
        )}

        {approved && !isQuestion && pronunciationAnswer && (
          <div className="mt-2 text-blue-50">
            <strong>Pronunciation:</strong>
            <p>{pronunciationAnswer}</p>
          </div>
        )}

        {isEditing && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 rounded border border-gray-400 bg-zinc-800"
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
              placeholder="Type your desired answer..."
              rows={2}
            />
            <button
              onClick={handleSubmitCustom}
              disabled={isTranslating}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {isTranslating ? 'Translating...' : 'Submit'}
            </button>
          </div>
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
