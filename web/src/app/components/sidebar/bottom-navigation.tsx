"use client";

import Image from "next/image";

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
    <div className="flex flex-col items-start gap-[4px] self-stretch p-5 border-t border-white/10">
      {/* Get the App */}
      <button
        onClick={onGetAppClick}
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
        onClick={onMyAccountClick}
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
        onClick={onLogoutClick}
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
  );
}
