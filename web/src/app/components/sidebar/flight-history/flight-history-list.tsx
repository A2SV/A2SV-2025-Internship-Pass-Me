"use client";

import type { Flight } from "../../../types/flight";
import FlightHistoryItem from "./flight-history-item";

interface FlightHistoryListProps {
  flights: Flight[];
  selectedFlightId: string | null;
  onSelectFlight: (id: string) => void;
  onDeleteFlight: (id: string) => void;
}

export default function FlightHistoryList({
  flights,
  selectedFlightId,
  onSelectFlight,
  onDeleteFlight,
}: FlightHistoryListProps) {
  return (
    <div className="flex flex-col">
      {flights.map((flight) => (
        <FlightHistoryItem
          key={flight.id}
          flight={flight}
          isSelected={flight.id === selectedFlightId}
          onSelect={() => onSelectFlight(flight.id)}
          onDelete={() => onDeleteFlight(flight.id)}
        />
      ))}
    </div>
  );
}
