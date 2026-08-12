"use client";

import { MdOutlineFilterList, MdOutlineKeyboardArrowDown, MdOutlineSort } from "react-icons/md";

const filterButtons = [
  {
    label: "FILTER",
    icon: "filter",
  },
  {
    label: "VEG",
    icon: "veg",
  },
  {
    label: "NON-VEG",
    icon: "nonveg",
  },
  {
    label: "SORT",
    icon: "sort",
  },
];

function FilterIcon({ type }) {
  if (type === "filter") {
    return <MdOutlineFilterList className="w-4 h-4" />;
  }
  if (type === "veg") {
    return (
      <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
        <div className="w-2 h-2 bg-green-600 rounded-full" />
      </div>
    );
  }
  if (type === "nonveg") {
    return (
      <div className="w-4 h-4 border-2 border-red-600 rounded-sm flex items-center justify-center">
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-600" />
      </div>
    );
  }
  if (type === "sort") {
    return <MdOutlineSort className="w-4 h-4" />;
  }
  return null;
}

export default function FilterButtons() {
  return (
    <div className="w-full flex justify-center px-[24px] md:px-[29px]">
      <div className="w-full max-w-[364px] md:max-w-none flex items-center gap-[12px] overflow-x-auto no-scrollbar">
        {filterButtons.map((btn) => (
          <button
            key={btn.label}
            className="flex items-center gap-[8px] h-[32px] min-w-[64px] px-[12px] py-[8px] bg-white rounded-[8px] border border-[#6B7971] shrink-0 cursor-pointer"
          >
            <FilterIcon type={btn.icon} />
            <span className="text-[14px] font-medium leading-[16px] uppercase text-[var(--gp-color-text-neutral-primary)]">
              {btn.label}
            </span>
            {btn.icon === "filter" && (
              <MdOutlineKeyboardArrowDown className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
