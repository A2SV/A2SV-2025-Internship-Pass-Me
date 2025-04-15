"use client";
import Sidebar from "../components/sidebar/sidebar";

// Mock data for demonstration - we'll move this to the sidebar component
const mockFlights = [
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

export default function TranslatorPage() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* This is where your teammate's form will go */}
        <div className="text-white text-center mt-10">
          <p>Main form will be integrated here</p>
        </div>
      </div>
    </div>
  );
}
