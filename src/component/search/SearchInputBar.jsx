"use client";

import Image from "next/image";
import ToggleSwitch from "./ToggleSwitch";

export default function SearchInputBar({
  value,
  onChange,
  isVegOnly,
  onToggleVeg,
  placeholder = "Biryani",
}) {
  const handleChange = (e) => {
    const cleanValue = e.target.value.replace(/[0-9]/g, "");
    e.target.value = cleanValue;
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full h-11 pl-10 pr-4 bg-white border border-[#e0e3e1] rounded-lg text-sm font-medium text-[#03130a] placeholder:text-[#a4aca7] outline-none focus:border-[#fe480b] transition-all shadow-xs"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
          <Image
            src="/home/search.svg"
            alt="Search"
            width={18}
            height={18}
            className="w-4 h-4 object-contain"
          />
        </div>
      </div>

      <
        ToggleSwitch
        isOn={isVegOnly}
        onToggle={onToggleVeg}
        label="Veg"
      />
    </div>
  );
}
