"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderHistoryCard() {
  const router = useRouter();

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-2">
      <div
        onClick={() => router.push("/profile/order-history")}
        className="flex items-center justify-between gap-2 cursor-pointer group"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-[#03130a] group-hover:text-[#FF480B] transition-colors">
            Order History
          </h3>
          <p className="text-xs text-[#6b7971] italic font-normal">
            View your recently delivered orders
          </p>
        </div>

        <div className="w-6 h-6 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <Image
            src="/profile/chevron_down.svg"
            alt="Order History"
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
