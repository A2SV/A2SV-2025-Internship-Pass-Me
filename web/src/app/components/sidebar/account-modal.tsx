"use client";

import Image from "next/image";

interface AccountModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function AccountModal({ onClose, onLogout }: AccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="inline-flex flex-col items-start gap-[10px] p-[40px] rounded-[12px] bg-[#202020] text-white w-full max-w-md relative">
        <button
          onClick={onClose}
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
            onClick={onLogout}
            className="flex h-[36px] px-6 py-3 justify-center items-center gap-2 rounded-[10px] border border-white bg-transparent text-white text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
