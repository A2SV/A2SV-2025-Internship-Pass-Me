"use client";

interface AccountModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function AccountModal({ onClose, onLogout }: AccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#222222] text-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              👤
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1">
              ✏️
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h3 className="font-medium">Your name</h3>
              <span className="ml-2 text-gray-400">✏️</span>
            </div>
            <p className="text-sm text-gray-400">yourname@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="py-3 border-b border-gray-700 flex justify-between items-center">
            <div className="font-medium">Change Password</div>
            <span className="text-gray-400">✏️</span>
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
            <span className="text-gray-400">ℹ️</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <span className="inline mr-2">📤</span>
            Share
          </button>

          <button
            onClick={onLogout}
            className="border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
