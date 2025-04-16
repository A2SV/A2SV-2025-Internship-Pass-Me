"use client";

import type React from "react";
import Image from "next/image";

interface Flight {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
}

interface FlightHistoryItemProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function FlightHistoryItem({
  flight,
  isSelected,
  onSelect,
  onDelete,
}: FlightHistoryItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onSelect}
      className={`flex flex-col items-center py-2 px-4 w-full max-w-[95%] self-stretch cursor-pointer rounded-lg transition-colors ${
        isSelected ? "bg-[#3150E0]" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Left side: message icon and text */}
        <div className="flex items-start gap-3">
          {/* Message Icon */}
          <div className="w-[42px] h-[42px]">
            <Image
              src="/messages.png"
              alt="message icon"
              width={42}
              height={42}
              className="object-contain aspect-square"
            />
          </div>

          {/* Text Block */}
          <div className="flex flex-col justify-center gap-[2px]">
            {/* Title */}
            <h3 className="text-[13px] leading-[20px] font-bold text-white font-['Inter']">
              {flight.title}
            </h3>

            {/* Origin - Destination */}
            <p className="text-[12px] leading-[20px] font-normal text-white/75 font-['Inter']">
              {flight.origin} - {flight.destination}
            </p>

            {/* Date */}
            <p className="text-[11px] leading-[20px] font-normal text-white/75 font-['Inter']">
              {flight.date}
            </p>
          </div>
        </div>

        {/* Trash Icon */}
        <button
          onClick={handleDelete}
          className="p-1"
          aria-label="Delete flight"
        >
          <Image
            src="/trash.png"
            alt="delete icon"
            width={19}
            height={22}
            className="w-[19px] h-[22px] object-contain"
          />
        </button>
      </div>
    </div>
  );
}
