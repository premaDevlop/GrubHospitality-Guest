"use client";

import { useState } from "react";
import Image from "next/image";

export default function OrderStatusCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 cursor-pointer group"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-[#03130a] group-hover:text-[#FF480B] transition-colors">
            Order Status
          </h3>
          <p className="text-xs text-[#6b7971] italic font-normal">
            We&apos;ve successfully{" "}
            <span className="text-[#3b7d24] font-medium not-italic">
              received
            </span>{" "}
            your order.
          </p>
        </div>

        <div className={`w-6 h-6 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <Image
            src="/profile/chevron_down.svg"
            alt="Toggle"
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
        </div>
      </div>

      {isOpen && (
        <div className="pt-3 border-t border-[#eff1f0] mt-2 flex flex-col gap-2 text-xs text-[#6b7971]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#03130a]">Order #GRB-8902</span>
            <span className="text-[#3b7d24] font-bold">In Kitchen</span>
          </div>
          <p>Estimated preparation time: 15-20 mins</p>
        </div>
      )}
    </div>
  );
}
