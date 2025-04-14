"use client";

import type React from "react";

import { MessageSquare, Trash2 } from "lucide-react";
import type { Flight } from "../../../types/flight";

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
          <MessageSquare className="w-5 h-5 mr-2 mt-1" />
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
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
