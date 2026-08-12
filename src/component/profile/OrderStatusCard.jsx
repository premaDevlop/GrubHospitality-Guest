"use client";

import { useState } from "react";
import Image from "next/image";

export default function OrderStatusCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 cursor-pointer"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
            Order Status
          </h3>
          <p className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
            We&apos;ve successfully{" "}
            <span className="text-[#479F29] font-normal italic">
              received
            </span>{" "}
            your order.
          </p>
        </div>

        <div className={`w-7 h-7 rounded-lg bg-[#f7f8fa] flex items-center justify-center shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <Image
            src="/profile/chevron_down.svg"
            alt="Toggle"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>
      </div>

      {isOpen && (
        <div className="pt-3 border-t border-[#E0E3E1] mt-2 flex flex-col gap-2 text-xs text-[#6B7971]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#03130A]">Order #GRB-8902</span>
            <span className="text-[#479F29] font-bold">In Kitchen</span>
          </div>
          <p>Estimated preparation time: 15-20 mins</p>
        </div>
      )}
    </div>
  );
}
