"use client";

import { MdOutlineFilterList, MdOutlineKeyboardArrowDown, MdOutlineSort } from "react-icons/md";

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

export default function FilterButtons({
  onOpenFilter,
  onOpenSort,
  selectedDietary = [],
  onToggleDietary,
}) {
  const isDietActive = (value) => selectedDietary.includes(value);

  const handleToggle = (value) => {
    if (onToggleDietary) onToggleDietary(value);
  };

  return (
    <div className="w-full flex justify-center px-[24px] md:px-[29px]">
      <div className="w-full max-w-[364px] md:max-w-none flex items-center gap-[12px] overflow-x-auto no-scrollbar">
        {/* FILTER - opens search FilterModal */}
        <button
          type="button"
          onClick={onOpenFilter}
          className="flex items-center gap-[8px] h-[32px] min-w-[64px] px-[12px] py-[8px] bg-white rounded-[8px] border border-[#6B7971] shrink-0 cursor-pointer"
        >
          <FilterIcon type="filter" />
          <span className="text-[14px] font-medium leading-[16px] uppercase text-[var(--gp-color-text-neutral-primary)]">
            FILTER
          </span>
          <MdOutlineKeyboardArrowDown className="w-4 h-4" />
        </button>

        {/* VEG quick toggle */}
        <button
          type="button"
          onClick={() => handleToggle("Veg")}
          className={`flex items-center gap-[8px] h-[32px] min-w-[64px] px-[12px] py-[8px] rounded-[8px] border shrink-0 cursor-pointer ${
            isDietActive("Veg")
              ? "bg-[var(--gp-color-bg-brand-secondary)] border-[var(--gp-color-brand-primary)]"
              : "bg-white border-[#6B7971]"
          }`}
        >
          <FilterIcon type="veg" />
          <span className="text-[14px] font-medium leading-[16px] uppercase text-[var(--gp-color-text-neutral-primary)]">
            VEG
          </span>
        </button>

        {/* NON-VEG quick toggle */}
        <button
          type="button"
          onClick={() => handleToggle("Non-Veg")}
          className={`flex items-center gap-[8px] h-[32px] min-w-[64px] px-[12px] py-[8px] rounded-[8px] border shrink-0 cursor-pointer ${
            isDietActive("Non-Veg")
              ? "bg-[var(--gp-color-bg-brand-secondary)] border-[var(--gp-color-brand-primary)]"
              : "bg-white border-[#6B7971]"
          }`}
        >
          <FilterIcon type="nonveg" />
          <span className="text-[14px] font-medium leading-[16px] uppercase text-[var(--gp-color-text-neutral-primary)]">
            NON-VEG
          </span>
        </button>

        {/* SORT - opens search SortByModal */}
        <button
          type="button"
          onClick={onOpenSort}
          className="flex items-center gap-[8px] h-[32px] min-w-[64px] px-[12px] py-[8px] bg-white rounded-[8px] border border-[#6B7971] shrink-0 cursor-pointer"
        >
          <FilterIcon type="sort" />
          <span className="text-[14px] font-medium leading-[16px] uppercase text-[var(--gp-color-text-neutral-primary)]">
            SORT
          </span>
        </button>
      </div>
    </div>
  );
}