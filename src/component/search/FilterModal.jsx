"use client";

import { useState } from "react";
import Image from "next/image";

export const DIETARY_OPTIONS = ["Veg", "Non-Veg"];

export const CUISINE_OPTIONS = [
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

export const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "Above ₹2,000", min: 2000, max: Infinity },
];

export const PRICE_OPTIONS = PRICE_RANGES.map((range) => range.label);

export function getPriceRange(label) {
  return PRICE_RANGES.find((range) => range.label === label);
}

export default function FilterModal({
  isOpen,
  onClose,
  title = "Filter",
  sections = [],
  selections = {},
  onApplyFilters,
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [tempSelections, setTempSelections] = useState(selections);

  if (!isOpen) return null;

  const handleToggle = (sectionId, item) => {
    setTempSelections((prev) => {
      const current = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: current.includes(item)
          ? current.filter((c) => c !== item)
          : [...current, item],
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(tempSelections);
    onClose();
  };

  const activeOptions = sections.find((s) => s.id === activeSection)?.options || [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in cursor-pointer"
    >
      <div
        className="w-full max-w-[480px] sm:max-w-[768px] bg-white rounded-t-3xl p-5 flex flex-col gap-4 animate-slide-up shadow-2xl relative max-h-[85vh] cursor-default"
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
          <h2 className="text-lg font-bold text-[#03130a]">{title}</h2>
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
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`py-3 text-left text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                  activeSection === section.id
                    ? "text-[#fe480b] border-r-2 border-[#fe480b]"
                    : "text-[#6b7971] hover:text-[#03130a]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto h-full pl-1 flex flex-col gap-3 pr-2 no-scrollbar">
            {activeOptions.map((item) => {
              const isChecked = (tempSelections[activeSection] || []).includes(item);
              return (
                <label
                  key={item}
                  onClick={() => handleToggle(activeSection, item)}
                  className="flex items-center gap-3 py-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-[#fe480b] border-[#fe480b]"
                        : "border-[#fe480b]/60 group-hover:border-[#fe480b] bg-white"
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
          </div>
        </div>
      </div>
    </div>
  );
}