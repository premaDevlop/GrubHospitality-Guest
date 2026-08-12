"use client";

import Image from "next/image";

export default function ProfileCard({ user, avatarUrl, onEditClick }) {
  const guestName = user?.guestName || "Parveen Kumar";
  const roomNumber = user?.room || user?.roomNumber || "302";

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e0e3e1] flex items-center justify-between gap-4">
      {/* Left Avatar & Edit Button */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FF480B] flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden shadow-sm">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={guestName}
              fill
              className="object-cover"
            />
          ) : (
            <span>{user?.avatarInitials || "RK"}</span>
          )}
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="flex items-center gap-1.5 text-xs font-bold text-[#FF480B] hover:text-[#e03d07] uppercase transition-colors cursor-pointer pt-0.5"
        >
          <Image
            src="/profile/edit.svg"
            alt="Edit"
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
          <span>edit info</span>
        </button>
      </div>

      {/* Guest Details */}
      <div className="flex flex-col gap-4 flex-1 pl-2">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 shrink-0 relative">
            <Image
              src="/profile/user.svg"
              alt="User"
              width={18}
              height={18}
              className="w-4 h-4 object-contain opacity-70"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-[#03130a]">
              {guestName}
            </h3>
            <span className="text-xs text-[#6b7971] font-normal">
              Guest Name
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-5 h-5 mt-0.5 shrink-0 relative">
            <Image
              src="/restaurant/key.svg"
              alt="Key"
              width={18}
              height={18}
              className="w-4 h-4 object-contain opacity-70"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-[#03130a]">
              {roomNumber}
            </h3>
            <span className="text-xs text-[#6b7971] font-normal">
              Room Number
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
