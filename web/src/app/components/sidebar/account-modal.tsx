"use client";

import { X, User, Edit, Info, Share } from "lucide-react";

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
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              <User className="w-8 h-8" />
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1">
              <Edit className="w-3 h-3" />
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h3 className="font-medium">Your name</h3>
              <Edit className="w-4 h-4 ml-2 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">yourname@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="py-3 border-b border-gray-700 flex justify-between items-center">
            <div className="font-medium">Change Password</div>
            <Edit className="w-4 h-4 text-gray-400" />
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
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <Share className="w-4 h-4 inline mr-2" />
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
