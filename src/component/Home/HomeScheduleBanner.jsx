"use client";

import Image from "next/image";

export default function HomeScheduleBanner() {
  return (
    <div className="w-full bg-white border border-[#e0e3e1] rounded-2xl p-4 flex items-center justify-between shadow-xs">
      <div className="flex flex-col gap-0.5 max-w-[65%]">
        <h3 className="text-sm font-bold text-[#03130a] leading-snug">
          Schedule order anytime,
        </h3>
        <p className="text-xs font-normal text-[#6b7971] leading-snug">
          Still get freshly cooked food.
        </p>
      </div>
      <div className="w-20 h-16 relative rounded-lg overflow-hidden shrink-0 border border-slate-100">
        <Image
          src="/loginCrousel/Login_Crousel2.jpg"
          alt="Schedule Order"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
