"use client";

import { useState } from "react";
import Image from "next/image";

export default function FilterModal({
  isOpen,
  onClose,
  selectedCuisines = [],
  onApplyFilters,
}) {
  const [activeCategory, setActiveCategory] = useState("CUISINES");
  const [tempCuisines, setTempCuisines] = useState(selectedCuisines);

  if (!isOpen) return null;

  const categories = ["PRICE", "DIETARY", "CUISINES"];

  const cuisineOptions = [
    "Indian",
    "Chinese",
    "Italian",
    "Continental",
    "Mexican",
    "Thai",
    "Japanese",
    "Mediterranean",
    "South Indian",
    "North Indian",
  ];

  const handleToggleCuisine = (item) => {
    if (tempCuisines.includes(item)) {
      setTempCuisines(tempCuisines.filter((c) => c !== item));
    } else {
      setTempCuisines([...tempCuisines, item]);
    }
  };

  const handleApply = () => {
    onApplyFilters(tempCuisines);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="w-full max-w-[480px] sm:max-w-[768px] bg-white rounded-t-3xl p-5 flex flex-col gap-4 animate-slide-up shadow-2xl relative max-h-[85vh]"
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

        {/* Header with Apply Button */}
        <div className="flex items-center justify-between border-b border-[#eff1f0] pb-3">
          <h2 className="text-lg font-bold text-[#03130a]">Filter</h2>
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
            APPLY
          </button>
        </div>

       
        <div className="flex items-start gap-4 h-[320px] overflow-hidden">
          <div className="w-28 flex flex-col border-r border-[#eff1f0] h-full pr-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`py-3 text-left text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "text-[#fe480b] border-r-2 border-[#fe480b]"
                    : "text-[#6b7971] hover:text-[#03130a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right  */}
          <div className="flex-1 overflow-y-auto h-full pl-1 flex flex-col gap-3 pr-2 no-scrollbar">
            {activeCategory === "CUISINES" &&
              cuisineOptions.map((item) => {
                const isChecked = tempCuisines.includes(item);
                return (
                  <label
                    key={item}
                    onClick={() => handleToggleCuisine(item)}
                    className="flex items-center gap-3 py-1.5 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-[#fe480b] border-[#fe480b]"
                          : "border-slate-300 group-hover:border-slate-400 bg-white"
                      }`}
                    >
                      {isChecked && (
                        <Image
                          src="/restaurant/check_white.svg"
                          alt="Checked"
                          width={12}
                          height={12}
                          className="w-3 h-3 object-contain"
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isChecked ? "text-[#03130a] font-bold" : "text-[#445048]"
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}

            {activeCategory !== "CUISINES" && (
              <div className="text-xs text-[#6b7971] py-8 text-center">
                Options for {activeCategory}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
