"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StayDetailsCard({ user }) {
  const router = useRouter();

  const hotelName = user?.hotel || "Hyatt Regency";
  const reservationId = user?.reservationId || "12345466";
  const checkIn = user?.checkIn || "20 June 2026";
  const checkOut = user?.checkOut || "28 June 2026";

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-4">
      {/* Top Header */}
      <div
        onClick={() => router.push("/profile/stay-details")}
        className="flex items-start justify-between gap-2 cursor-pointer group border-b border-[#eff1f0] pb-3"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-[#03130a] group-hover:text-[#FF480B] transition-colors">
            Stay Details
          </h3>
          <p className="text-xs text-[#6b7971] italic font-normal">
            View your stay information.
          </p>
        </div>
        <div className="w-6 h-6 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <Image
            src="/profile/external_link.svg"
            alt="Stay Info"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-1">
        {/* Hotel Name */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#03130a]">
            {hotelName}
          </span>
          <span className="text-xs text-[#6b7971] font-normal">
            Hotel Name
          </span>
        </div>

        {/* Reservation ID */}
        <div className="flex flex-col text-right">
          <span className="text-sm font-bold text-[#03130a]">
            {reservationId}
          </span>
          <span className="text-xs text-[#6b7971] font-normal">
            Reservation ID
          </span>
        </div>

        {/* Check-in */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#03130a]">
            {checkIn}
          </span>
          <span className="text-xs text-[#6b7971] font-normal">
            Check-in
          </span>
        </div>

        {/* Check-out */}
        <div className="flex flex-col text-right">
          <span className="text-sm font-bold text-[#03130a]">
            {checkOut}
          </span>
          <span className="text-xs text-[#6b7971] font-normal">
            Check-out
          </span>
        </div>
      </div>
    </div>
  );
}
