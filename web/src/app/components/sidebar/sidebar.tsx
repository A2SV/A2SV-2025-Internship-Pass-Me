"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Types
interface Flight {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
}

// Mock data
const mockFlights: Flight[] = [
  {
    id: "1",
    title: "My First Trip to USA",
    origin: "Ethiopia",
    destination: "USA",
    date: "Mar 28, 2025",
  },
  {
    id: "2",
    title: "Family Trip",
    origin: "Dubai",
    destination: "France",
    date: "Jan 20, 2025",
  },
  {
    id: "3",
    title: "Pick up the package ordered online",
    origin: "Ethiopia",
    destination: "China",
    date: "Jun 9, 2024",
  },
];

// Main Sidebar Component
export default function Sidebar() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleDeleteFlight = (id: string) => {
    setFlights(flights.filter((flight) => flight.id !== id));
    if (selectedFlightId === id) {
      setSelectedFlightId(null);
      router.push("/dashboard");
    }
  };

  const handleSelectFlight = (id: string) => {
    setSelectedFlightId(id);
    router.push(`/dashboard/flight/${id}`);
  };

  const handleNewChat = () => {
    setSelectedFlightId(null);
    router.push("/dashboard/newflight");
  };

  const toggleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  const handleLogout = () => {
    window.location.href = "/home";
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] text-white sm:w-[422px] w-full border-r border-gray-800">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-[271px] h-[40px] px-20 py-2 flex items-center justify-center gap-2 aspect-[271/40] rounded-[12px] bg-white hover:bg-neutral-200 text-black mx-auto transition-colors cursor-pointer"
          >
            <span className="text-xl">+</span>
            <span>New chat</span>
          </button>
        </div>

        {/* Flight History List */}
        <div className="flex-1 overflow-y-auto">
          {flights.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full text-white">
              <div
                className="mb-4"
                style={{ width: "62.274px", height: "46.294px", flexShrink: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="48"
                  viewBox="0 0 64 48"
                  fill="none"
                >
                  <path
                    d="M63.0975 6.77997C62.9634 5.92829 62.5736 5.13749 61.9798 4.51241C61.386 3.88734 60.6162 3.45753 59.7725 3.27998L49.5 1.02248C48.3984 0.782221 47.258 0.78132 46.1561 1.01983C45.0541 1.25834 44.0162 1.7307 43.1125 2.40498L12.75 24.525L4.245 24.175C3.56131 24.1505 2.88728 24.3421 2.31865 24.7225C1.75003 25.1029 1.31572 25.6528 1.07742 26.2941C0.839114 26.9354 0.808929 27.6354 0.991151 28.2949C1.17337 28.9543 1.55874 29.5395 2.09251 29.9675L10.8425 36.845C11.8925 38.1225 12.5925 37.8775 29.97 28.41L31.5975 44.895C31.6246 45.3447 31.7787 45.7774 32.0421 46.143C32.3054 46.5085 32.667 46.7918 33.085 46.96C33.3854 47.0801 33.7065 47.1396 34.03 47.135C34.6809 47.1151 35.3025 46.8602 35.78 46.4175L39.9625 42.6025C40.379 42.2166 40.661 41.7076 40.7675 41.15L44.6 20.325C50.8475 16.825 56.7625 13.535 60.98 11.1375C61.7345 10.713 62.3416 10.0684 62.7199 9.28975C63.0983 8.51109 63.23 7.63549 63.0975 6.77997ZM59.2475 8.09247C54.8725 10.5775 48.7475 14.06 42.1675 17.665L41.45 18.0675L37.3725 40.24L34.8 42.585L32.875 22.81L30.5475 24C18 31 13.8175 33.03 12.3825 33.66L4.8575 27.6925L13.7475 28.0775L45.2475 5.22247C45.7421 4.85132 46.3098 4.58922 46.9131 4.45348C47.5164 4.31774 48.1416 4.31143 48.7475 4.43498L58.985 6.63997C59.1427 6.66858 59.2872 6.74681 59.3974 6.86329C59.5076 6.97976 59.5777 7.12837 59.5975 7.28747C59.6335 7.44145 59.6189 7.60294 59.5559 7.74796C59.4928 7.89298 59.3847 8.0138 59.2475 8.09247Z"
                    fill="#FFF"
                  />
                </svg>
              </div>

              <h3
                className="mb-4"
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "20px",
                }}
              >
                No Flight Details Yet
              </h3>

              <p
                className="max-w-[300px]"
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Start by adding your travel info — origin, destination, reason,
                and more — so we can help you communicate clearly at your
                destination
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  onClick={() => handleSelectFlight(flight.id)}
                  className={`flex flex-col items-center py-2 px-4 w-full max-w-[95%] self-stretch cursor-pointer rounded-lg transition-colors ${
                    flight.id === selectedFlightId ? "bg-[#3150E0]" : ""
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFlight(flight.id);
                      }}
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-start gap-[4px] self-stretch p-5 border-t border-white/10">
        {/* Get the App */}
        <button
          onClick={() => {}}
          className="flex items-center w-full py-3 hover:bg-[#2A2A2A] transition-colors"
        >
          <Image
            src="/phone.png"
            alt="Get the App"
            width={20}
            height={20}
            className="mr-3"
          />
          <span>Get the App</span>
        </button>

        {/* My Account */}
        <button
          onClick={toggleAccountModal}
          className="flex items-center w-full py-3 hover:bg-[#2A2A2A] transition-colors"
        >
          <Image
            src="/User.png"
            alt="My Account"
            width={20}
            height={20}
            className="mr-3"
          />
          <span>My account</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-3 hover:bg-[#2A2A2A] transition-colors"
        >
          <Image
            src="/SignOut.png"
            alt="Log out"
            width={20}
            height={20}
            className="mr-3"
          />
          <span>Log out</span>
        </button>
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="inline-flex flex-col items-start gap-[10px] p-[40px] rounded-[12px] bg-[#202020] text-white w-full max-w-md relative">
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-4 right-4 text-white"
              aria-label="Close"
            >
              ✕
            </button>

            {/* User section */}
            <div className="flex items-center mb-6">
              <div className="relative">
                {/* Photo with edit button container */}
                <div
                  className="w-[70px] h-[70px] rounded-full bg-gray-500 overflow-hidden"
                  style={{
                    backgroundImage: `url("/photo.png")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Edit button box */}
                  <div
                    className="w-[25px] h-[25px] absolute right-0 bottom-0 bg-gray-600 rounded-full flex justify-center items-center"
                    style={{
                      filter: "drop-shadow(0px 1px 4px rgba(26, 15, 1, 0.12))",
                    }}
                  >
                    {/* Edit icon */}
                    <Image
                      src="/edit.png"
                      alt="Edit"
                      width={16}
                      height={16}
                      className="absolute right-[5px] bottom-[4px] filter invert brightness-0"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h3 className="font-medium">Your name</h3>
                  <Image
                    src="/edit.png"
                    alt="Edit Name"
                    width={14}
                    height={14}
                    className="ml-2 filter invert brightness-0"
                  />
                </div>
                <p className="text-sm text-gray-400">yourname@gmail.com</p>
              </div>
            </div>

            {/* Settings section */}
            <div className="w-full space-y-4">
              <div className="py-3 border-b border-gray-700 flex justify-between items-center">
                <div className="font-medium">Change Password</div>
                <Image
                  src="/edit.png"
                  alt="Edit"
                  width={21}
                  height={21}
                  className="filter invert brightness-0"
                />
              </div>

              <div className="py-3 border-b border-gray-700 flex justify-between items-center">
                <div className="font-medium">Language Preference</div>
                <div className="text-gray-400">English</div>
              </div>

              <div className="py-3 border-b border-gray-700 flex justify-between items-center">
                <div className="font-medium">Clear History</div>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
                  Clear All
                </button>
              </div>

              <div className="py-3 border-b border-gray-700 flex justify-between items-center">
                <div className="font-medium">About</div>
                <Image src="/about.png" alt="About" width={24} height={24} />
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="mt-6 flex justify-between w-full gap-4">
              {/* Share Button */}
              <button className="flex h-[36px] px-6 py-3 justify-center items-center gap-2 rounded-[6px] bg-[#3972FF] text-white text-sm font-medium">
                Share
              </button>

              {/* Log Out Button */}
              <button
                onClick={handleLogout}
                className="flex h-[36px] px-6 py-3 justify-center items-center gap-2 rounded-[10px] border border-white bg-transparent text-white text-sm font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
