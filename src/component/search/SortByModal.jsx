"use client";

import { useState } from "react";
import Image from "next/image";

export default function SortByModal({
  isOpen,
  onClose,
  selectedSort,
  onApplySort,
}) {
  const [currentSort, setCurrentSort] = useState(selectedSort || "relevance");

  if (!isOpen) return null;

  const options = [
    { id: "relevance", label: "Relevance (Default)" },
    { id: "price_low_high", label: "Price (Low to High)" },
    { id: "price_high_low", label: "Price (High to Low)" },
    { id: "rating_high_low", label: "Rating (High to Low)" },
    { id: "rating_low_high", label: "Rating (Low to High)" },
  ];

  const handleApply = () => {
    onApplySort(currentSort);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-[480px] sm:max-w-[768px] bg-white rounded-t-3xl p-5 flex flex-col gap-4 animate-slide-up shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg text-[#03130a] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <Image
            src="/restaurant/close.svg"
            alt="Close"
            width={18}
            height={18}
            className="w-4 h-4 object-contain"
          />
        </button>

        <div className="flex items-center justify-between border-b border-[#eff1f0] pb-3">
          <h2 className="text-lg font-bold text-[#03130a]">Sort By</h2>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-1.5 bg-[#fe480b] hover:bg-[#e03d07] text-white rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Image
              src="/restaurant/check_white.svg"
              alt="Apply"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            apply
          </button>
        </div>

        {/* Radio  */}
        <div className="flex flex-col gap-3 py-1">
          {options.map((option) => {
            const isSelected = currentSort === option.id;
            return (
              <label
                key={option.id}
                onClick={() => setCurrentSort(option.id)}
                className="flex items-center gap-3 py-2 px-1 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-[#fe480b]"
                      : "border-slate-300 group-hover:border-slate-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fe480b]" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isSelected ? "text-[#03130a] font-bold" : "text-[#445048]"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
