"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRoom } from "@/component/providers/RoomProvider";

export default function HomeHeroBanner({ user }) {
  const { bookedRooms, isMultipleRooms, selectedRoom, setSelectedRoom } = useRoom();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentRoom = selectedRoom || user?.room || "302";

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!user) return null;

  return (
    <div className="relative w-full h-[430px] sm:h-[500px] rounded-lg shadow-sm border border-[#e0e3e1] z-20">
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Image
          src="/loginCrousel/Login_Crousel1.jpg"
          alt={user.hotel || "Hyatt Regency"}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      </div>

      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1 z-10 text-white">
        <span className="text-sm font-medium tracking-wide text-slate-200">
          Welcome, {user.name}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {user.hotel}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 mb-2 font-light">
          {user.location}
        </p>

        {/* Room Pill / Dropdown Container */}
        <div className="relative self-start" ref={dropdownRef}>
          {isMultipleRooms ? (
            <>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center gap-2 cursor-pointer hover:bg-black/60 transition-all text-white active:scale-95"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
              >
                <Image
                  src="/restaurant/key.svg"
                  alt="Key"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="text-xs font-semibold tracking-wide">
                  Room {currentRoom}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu  */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 min-w-[155px] bg-white rounded-xl shadow-2xl border border-[#e0e3e1] overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#9ca8a2] uppercase tracking-wider border-b border-[#f0f2f1]">
                    Select Room
                  </div>
                  <div className="max-h-48 overflow-y-auto divide-y divide-[#f7f8fa]">
                    {bookedRooms.map((room) => {
                      const isSelected = String(room) === String(currentRoom);
                      return (
                        <button
                          key={room}
                          type="button"
                          onClick={() => {
                            setSelectedRoom(room);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#fef2f0] text-[#fe480b] font-bold"
                              : "text-[#03130a] font-medium hover:bg-[#fff5f2] hover:text-[#fe480b]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={isSelected ? "/home/key_red.svg" : "/restaurant/key.svg"}
                              alt="Key"
                              width={13}
                              height={13}
                              className={`w-3.5 h-3.5 object-contain ${
                                !isSelected ? "brightness-0 opacity-60" : ""
                              }`}
                            />
                            <span>Room {room}</span>
                          </div>
                          {isSelected && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="text-[#fe480b] shrink-0"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="#fe480b"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center gap-2">
              <Image
                src="/restaurant/key.svg"
                alt="Key"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
              <span className="text-xs font-semibold tracking-wide">
                Room {currentRoom}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
