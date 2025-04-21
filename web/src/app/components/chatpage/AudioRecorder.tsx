import React, { useState, useRef } from 'react'
import Image from 'next/image'

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
        console.log('Recording complete. Audio blob:', audioBlob)
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      console.error('Error starting recording:', err)
      setError('Could not start recording: ' + (err as Error).message)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  const handleRecordButton = () => {
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <>
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <footer className="fixed inset-x-50 bottom-5 p-4 flex flex-col items-center justify-center w-full">
        <button
          onClick={handleRecordButton}
          className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-4 focus:outline-none transition 
            ${recording ? 'animate-pulse border-4' : ''}`}
        >
          <Image src="/mic.svg" alt="Mic" height={30} width={30} />
          {/* <span className="ml-2">{recording ? 'Stop' : 'Record'}</span> */}
        </button>

        {audioURL && (
          <div className="mt-4 flex flex-col items-center">
            <a
              href={audioURL}
              download="recording.wav"
              className="mt-2 text-blue-400 underline"
            >
              Download Recording
            </a>
          </div>
        )}
      </footer>
    </>
  )
}

export default AudioRecorder
