"use client";

import { useState } from "react";
import Image from "next/image";
import StayOrderCard from "./StayOrderCard";

export default function StayCard({ stay }) {
  const [isOpen, setIsOpen] = useState(stay?.isCurrent || false);

  if (!stay) return null;

  return (
    <div
      className={`w-full bg-white rounded-lg p-4 flex flex-col gap-4 transition-all ${
        stay.isCurrent
          ? "border border-[#FFCCCC] shadow-[0px_0px_4px_rgba(0,0,0,0.16)]"
          : "border border-[#E0E3E1]"
      }`}
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-end justify-between gap-3 w-full">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
            {stay.dates}
          </h3>
          <span className="text-[14px] leading-[20px] font-normal italic text-[#479F29] shrink-0">
            {stay.status}
          </span>
        </div>

        <p className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
          {stay.hotelName}
        </p>
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[16px] leading-[24px] font-normal text-[#37493F]">
            {stay.roomNumber}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Room Number
          </span>
        </div>

        <div className="flex flex-col gap-1 flex-1 text-right">
          <span className="text-[16px] leading-[24px] font-normal text-[#37493F]">
            {stay.reservationId}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Reservation ID
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-[16px] leading-[24px] font-normal text-[#37493F]">
            {stay.totalOrders}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Total Orders
          </span>
        </div>

        <div className="flex flex-col gap-1 flex-1 text-right">
          <span className="text-[16px] leading-[24px] font-normal text-[#37493F]">
            ₹{stay.totalAmount}
          </span>
          <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
            Total Orders Amount
          </span>
        </div>
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      {/* Toggle */}
      <div className="w-full flex justify-center items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 h-8 px-3 rounded-lg text-[14px] leading-[16px] font-medium text-[#FF3333] uppercase cursor-pointer"
        >
          <span>{stay.isCurrent ? "VIEW ORDERS" : "FOOD ORDERS"}</span>
          <Image
            src="/profile/chevron_down_red.svg"
            alt="Toggle"
            width={16}
            height={16}
            className={`w-4 h-4 object-contain transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Orders List */}
      {isOpen && stay.orders && stay.orders.length > 0 && (
        <div className="flex flex-col gap-3 pt-2">
          {stay.orders.map((order) => (
            <StayOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
