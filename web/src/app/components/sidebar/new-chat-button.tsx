"use client";

interface NewChatButtonProps {
  onClick: () => void;
}

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border border-gray-700 rounded-md py-2 px-4 flex items-center justify-center transition-colors"
    >
      <span className="mr-2">+</span>
      <span>New chat</span>
    </button>
  );
}
