"use client";
import FlightHistoryItem from "./flight-history-item";

// Define the Flight type directly here to avoid import issues
interface Flight {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
}

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
