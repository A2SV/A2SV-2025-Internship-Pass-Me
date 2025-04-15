"use client";

import type React from "react";

// Define the Flight type directly here to avoid import issues
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
      className={`flex items-start p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors ${
        isSelected ? "bg-blue-600" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex items-start">
          <div className="mr-2 mt-1">
            {/* Simple message icon replacement */}
            <span className="inline-block w-5 h-5 border border-gray-500 rounded-sm flex items-center justify-center text-xs">
              💬
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{flight.title}</h3>
            <p className="text-sm text-gray-400">
              {flight.origin} - {flight.destination}
            </p>
            <p className="text-xs text-gray-500">{flight.date}</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 p-1"
            aria-label="Delete flight"
          >
            {/* Simple trash icon replacement */}
            <span className="inline-block">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
