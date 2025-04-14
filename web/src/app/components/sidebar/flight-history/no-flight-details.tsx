import { Plane } from "lucide-react";

export default function NoFlightDetails() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
      <Plane className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Flight Details Yet</h3>
      <p className="text-sm text-gray-400 max-w-[250px]">
        Start by adding your travel info — origin, destination, reason, and more
        — so we can help you communicate clearly at your destination
      </p>
    </div>
  );
}
