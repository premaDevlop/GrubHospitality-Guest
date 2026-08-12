"use client";

import Image from "next/image";

export default function BillSummaryCard({ amount = 1500 }) {
  return (
    <div className="w-full h-[280px] relative flex flex-col justify-center items-center select-none shrink-0">
      <div className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0px_8px_32px_rgba(102,102,102,0.16)] block md:hidden">
        <Image
          src="/profile/Subtract-mobile.png"
          alt="Receipt Background"
          fill
          className="object-fill"
          priority
        />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0px_8px_32px_rgba(102,102,102,0.16)] hidden md:block lg:hidden">
        <Image
          src="/profile/Subtract.png"
          alt="Receipt Background"
          fill
          className="object-fill"
          priority
        />
      </div>

      <div className="relative z-10 w-full h-full p-5 sm:p-6 flex flex-col justify-between py-6">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
            Bill Summary
          </h3>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
              Your total amount to pay
            </span>
            <span className="text-[14px] leading-[20px] font-normal italic text-[#479F29]">
              ₹{amount}
            </span>
          </div>
        </div>

        <div className="w-full border-t border-[#E8EAED]" />

        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[16px] leading-[24px] font-normal text-[#37493F]">
              Items Total
            </span>
            <span className="text-[16px] leading-[24px] font-normal text-[#37493F] text-right">
              ₹{amount}
            </span>
          </div>
          <span className="text-[12px] leading-[16px] font-normal text-[#6B7971]">
            *Bill will be added to your hotel bill.
          </span>
        </div>

        <div className="w-full border-t border-[#E0E3E1]" />
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-[16px] leading-[24px] font-bold text-[#37493F]">
            Grand Total
          </span>
          <span className="text-[16px] leading-[24px] font-semibold text-[#37493F] text-right">
            ₹{amount}
          </span>
        </div>
      </div>
    </div>
  );
}
