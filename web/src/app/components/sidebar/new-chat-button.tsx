"use client";

import { PlusIcon } from "lucide-react";

interface NewChatButtonProps {
  onClick: () => void;
}

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border border-gray-700 rounded-md py-2 px-4 flex items-center justify-center transition-colors"
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      <span>New chat</span>
    </button>
  );
}
