"use client";

import { useState } from "react";
import NewChatButton from "./new-chat-button";
import FlightHistoryList from "./flight-history/flight-history-list";
import NoFlightDetails from "./flight-history/no-flight-details";
import BottomNavigation from "./bottom-navigation";
import AccountModal from "./account-modal";
import type { Flight } from "../../types/flight";

export default function Sidebar() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleDeleteFlight = (id: string) => {
    setFlights(flights.filter((flight) => flight.id !== id));
    if (selectedFlightId === id) {
      setSelectedFlightId(null);
    }
  };

  const handleSelectFlight = (id: string) => {
    setSelectedFlightId(id);
    // Here you would typically notify the parent component about the selected flight
    // so that the main form can be updated with the selected flight's data
  };

  const handleNewChat = () => {
    setSelectedFlightId(null);
    // Additional logic for starting a new chat would go here
  };

  const toggleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  const handleLogout = () => {
    // Redirect to home page
    window.location.href = "/home";
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] text-white w-[360px] border-r border-gray-800">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4">
          <NewChatButton onClick={handleNewChat} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {flights.length === 0 ? (
            <NoFlightDetails />
          ) : (
            <FlightHistoryList
              flights={flights}
              selectedFlightId={selectedFlightId}
              onSelectFlight={handleSelectFlight}
              onDeleteFlight={handleDeleteFlight}
            />
          )}
        </div>
      </div>

      <BottomNavigation
        onGetAppClick={() => {}}
        onMyAccountClick={toggleAccountModal}
        onLogoutClick={handleLogout}
      />

      {showAccountModal && (
        <AccountModal
          onClose={() => setShowAccountModal(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
