"use client";

import { Smartphone, User, LogOut } from "lucide-react";

interface BottomNavigationProps {
  onGetAppClick: () => void;
  onMyAccountClick: () => void;
  onLogoutClick: () => void;
}

export default function BottomNavigation({
  onGetAppClick,
  onMyAccountClick,
  onLogoutClick,
}: BottomNavigationProps) {
  return (
    <div className="border-t border-gray-800 py-2">
      <button
        onClick={onGetAppClick}
        className="flex items-center w-full px-4 py-3 hover:bg-[#2A2A2A] transition-colors"
      >
        <Smartphone className="w-5 h-5 mr-3" />
        <span>Get the App</span>
      </button>

      <button
        onClick={onMyAccountClick}
        className="flex items-center w-full px-4 py-3 hover:bg-[#2A2A2A] transition-colors"
      >
        <User className="w-5 h-5 mr-3" />
        <span>My account</span>
      </button>

      <button
        onClick={onLogoutClick}
        className="flex items-center w-full px-4 py-3 hover:bg-[#2A2A2A] transition-colors"
      >
        <LogOut className="w-5 h-5 mr-3" />
        <span>Log out</span>
      </button>
    </div>
  );
}
