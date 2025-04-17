"use client";

import { useParams } from "next/navigation";
import Sidebar from "../../../components/sidebar/sidebar";
import FlightDetail from "../../../components/flight-detail/flight-detail";

export default function FlightDetailPage() {
  const params = useParams();
  const flightId = params.id as string;

  return (
    <div className="flex h-screen bg-[#121212]">
      <Sidebar />
      <FlightDetail flightId={flightId} />
    </div>
  );
}
