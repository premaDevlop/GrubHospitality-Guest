"use client";

import Image from "next/image";

export default function ToggleSwitch({ isOn, onToggle, label }) {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 select-none">
      {label && (
        <div className="flex items-center gap-1">
          <Image
            src="/restaurant/veg_badge.svg"
            alt="Veg"
            width={12}
            height={12}
            className="w-3 h-3 object-contain shrink-0"
          />
          <span className="text-[12px] font-semibold text-[#37493F]">
            {label}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        className={`w-8 h-4 flex items-center rounded-full p-[1.5px] transition-all cursor-pointer ${
          isOn ? "bg-[#C2E7D9]" : "bg-[#E0E3E1]"
        }`}
        aria-label={label || "Toggle Switch"}
      >
        <div
          className={`w-[13px] h-[13px] rounded-full shadow-xs transform transition-all ${
            isOn ? "translate-x-3.5 bg-[#00BD06]" : "translate-x-0 bg-[#6B7971]"
          }`}
        />
      </button>
    </div>
  );
}
