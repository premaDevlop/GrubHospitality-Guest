"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/component/ui/LoadingScreen";
import { useRoom } from "@/component/providers/RoomProvider";

export default function RoomSelectionPage() {
  const router = useRouter();
  const { bookedRooms, setSelectedRoom } = useRoom();
  const [localSelectedRoom, setLocalSelectedRoom] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const rooms = bookedRooms || [];

  const handleContinue = () => {
    if (!localSelectedRoom) return;
    setSelectedRoom(localSelectedRoom);
    setShowLoading(true);
  };

  const handleSkip = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    router.push("/home");
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={2000} />;
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center select-none">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-white flex flex-col px-6 pt-12 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[#03130a] mb-1">
            Select a Room
          </h1>
          <p className="text-sm text-[#6b7971]">
            Choose a room to place your food order
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-2 gap-3 mb-auto">
          {rooms.map((room) => {
            const isSelected = localSelectedRoom === room;
            return (
              <button
                key={room}
                type="button"
                onClick={() => setLocalSelectedRoom(room)}
                className={`flex items-center gap-3 px-4 py-5 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#fe480b] bg-[#fef2f0]"
                    : "border-[#e0e3e1] bg-white hover:border-[#c1c7c4]"
                }`}
              >
                {/* Key Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[#fe480b]"
                >
                  <path
                    d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-semibold text-[#03130a]">
                  Room {room}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!localSelectedRoom}
            className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all mb-4 ${
              localSelectedRoom
                ? "bg-[#fe480b] text-white cursor-pointer hover:bg-[#e4450a]"
                : "bg-[#eff1f0] text-[#c1c7c4] cursor-not-allowed"
            }`}
          >
            Continue
          </button>

          {/* Skip */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-sm font-semibold text-[#03130a] uppercase tracking-wide mb-6 cursor-pointer hover:text-[#fe480b] transition-colors"
          >
            Skip
          </button>

          {/* Info Box */}
          <div className="bg-[#f7f8fa] rounded-xl px-4 py-3 flex gap-3">
            <div className="shrink-0 mt-0.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#6b7971]"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#03130a] mb-0.5">
                Why choose a room?
              </p>
              <p className="text-xs text-[#6b7971] leading-relaxed">
                This helps us deliver your order to the right room quickly and
                accurately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
