"use client";

interface NewChatButtonProps {
  onClick: () => void;
}

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-[271px] h-[40px] px-20 py-2 flex items-center justify-center gap-2 aspect-[271/40] rounded-[12px] bg-white hover:bg-neutral-200 text-black mx-auto transition-colors"
    >
      <span className="text-xl">+</span>
      <span>New chat</span>
    </button>
  );
}
