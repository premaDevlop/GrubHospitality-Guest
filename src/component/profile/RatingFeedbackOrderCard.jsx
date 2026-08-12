"use client";

import Image from "next/image";

export default function RatingFeedbackOrderCard({ order }) {
  const restaurantName = order?.restaurantName || "House Of Ming";
  const time = order?.time || "13 June’ 26, 17:09";
  const status = order?.status || "Delivered";
  const items = order?.items || [
    { name: "Hyderabadi Biryani", qty: 1, isVeg: true },
    { name: "Hyderabadi Biryani", qty: 1, isVeg: true }
  ];
  const totalAmount = order?.totalAmount || 1240;

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-2xs border border-[#E0E3E1] flex flex-col gap-3">
      <div className="flex flex-col gap-1 w-full">
        <h4 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
          {restaurantName}
        </h4>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
            Ordered : {time}
          </span>
          <span className="text-[14px] leading-[20px] font-normal italic text-[#479F29]">
            {status}
          </span>
        </div>
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-4 h-4 rounded flex items-center justify-center shrink-0">
                <Image
                  src={item.isVeg ? "/restaurant/veg_badge.svg" : "/restaurant/nonveg_badge.svg"}
                  alt="Badge"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="text-[16px] leading-[24px] font-normal text-[#37493F] truncate">
                {item.name}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 justify-end">
              <Image
                src="/profile/x.svg"
                alt="x"
                width={12}
                height={12}
                className="w-3 h-3 object-contain opacity-70"
              />
              <span className="text-[14px] leading-[20px] font-normal text-[#6B7971]">
                {item.qty}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
          Total Amount
        </span>
        <span className="text-[14px] leading-[20px] font-normal italic text-[#37493F] text-right">
          ₹{totalAmount}
        </span>
      </div>
    </div>
  );
}
