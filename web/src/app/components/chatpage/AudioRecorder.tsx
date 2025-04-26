'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useSendAudioChatMutation, ChatResponse } from '@/app/services/chatApi';

interface AudioRecorderProps {
  flightId: string;
  onNewReply: (reply: ChatResponse) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  flightId,
  onNewReply,
}) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [sendAudioChat, { isLoading: isSending }] =
    useSendAudioChatMutation();

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const file = new File([audioBlob], 'recording.wav', {
          type: 'audio/wav',
        });
        setAudioURL(URL.createObjectURL(audioBlob));
        try {
          const response = await sendAudioChat({ flightId, file }).unwrap();
          onNewReply(response);
        } catch (err) {
          console.error('Error sending audio:', err);
          setError('Failed to send audio to AI.');
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Could not start recording: ' + (err as Error).message);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <footer className="flex items-center justify-center sticky bottom-5 w-full bg-[#1C1C1C] z-10">
        <button
          onClick={() => (recording ? stopRecording() : startRecording())}
          disabled={isSending}
          className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 transition ${
            recording ? 'animate-pulse border-4' : ''
          }`}
        >
          <Image src="/mic.svg" alt="Mic" height={30} width={30} />
        </button>
        {audioURL && (
          <div className="ml-4">
            <audio src={audioURL} controls className="rounded" />
          </div>
        )}
      </footer>
    </>
  );
};

export default AudioRecorder;
