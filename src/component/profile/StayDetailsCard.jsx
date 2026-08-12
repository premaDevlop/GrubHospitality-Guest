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
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-3">
      <div
        onClick={() => router.push("/profile/stay-details")}
        className="flex items-start justify-between gap-2 cursor-pointer pb-1"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
            Stay Details
          </h3>
          <p className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
            View your stay information.
          </p>
        </div>
        <div className="w-7 h-7 rounded-lg bg-[#f7f8fa] flex items-center justify-center shrink-0">
          <Image
            src="/profile/external_link.svg"
            alt="Stay Info"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>
      </div>

      <div className="w-full border-t border-[#E0E3E1] my-0.5" />

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-1">
        <div className="flex flex-col gap-1">
          <span className="text-[16px] leading-[24px] font-semibold text-[#37493F]">
            {hotelName}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Hotel Name
          </span>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <span className="text-[16px] leading-[24px] font-semibold text-[#37493F]">
            {reservationId}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Reservation ID
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[16px] leading-[24px] font-semibold text-[#37493F]">
            {checkIn}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Check-in
          </span>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <span className="text-[16px] leading-[24px] font-semibold text-[#37493F]">
            {checkOut}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Check-out
          </span>
        </div>
      </div>
    </div>
  );
}
