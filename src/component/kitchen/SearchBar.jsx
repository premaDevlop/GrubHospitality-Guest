"use client";

import { MdOutlineSearch } from "react-icons/md";

export default function SearchBar({ placeholder = "Search, Dish, Restaurants etc." }) {
  return (
    <div className="w-full flex justify-center px-[24px] md:px-[29px]">
      <div
        className="w-full max-w-[364px] md:max-w-none h-[48px] flex items-center gap-[12px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#C1C7C4]"
      >
        <MdOutlineSearch className="w-6 h-6 text-[var(--gp-color-text-neutral-tertiary)] shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-full text-[16px] text-[var(--gp-color-text-neutral-primary)] placeholder:text-[var(--gp-color-text-neutral-light)] outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
