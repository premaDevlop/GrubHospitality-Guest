"use client";

import Image from "next/image";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function CategoryCard({
  title = "Category",
  description = "",
  image = "/kitchen/kitch.jpg",
  action = null,
  isExpanded = true,
  onToggle,
}) {
  return (
    <div
      className="w-full flex flex-col bg-white rounded-t-[var(--gp-radius-xl)]"
    >
      {/* Header with title and toggle */}
      <div className="w-full flex items-center justify-between gap-[var(--gp-space-m)] px-[var(--gp-padding-l)] md:px-[var(--gp-padding-xl)] py-[var(--gp-space-m)]">
        <h2
          className="text-[22px] md:text-[28px] leading-[32px] md:leading-[40px] font-heading text-[var(--gp-color-text-neutral-primary)]"
          style={{
            fontFamily: "var(--gp-font-heading)",
            fontWeight: "var(--gp-font-weight-heading)",
          }}
        >
          {title}
        </h2>
        <div className="flex items-center gap-[var(--gp-space-m)]">
          {action}
          {onToggle && (
            <button
              onClick={onToggle}
              className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
            >
              {isExpanded ? (
                <MdOutlineKeyboardArrowUp className="w-6 h-6 text-[var(--gp-color-text-neutral-primary)]" />
              ) : (
                <MdOutlineKeyboardArrowDown className="w-6 h-6 text-[var(--gp-color-text-neutral-primary)]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Banner Image with Gradient Overlay - only when expanded */}
      {isExpanded && (
        <div className="w-full px-[var(--gp-padding-l)] md:px-[var(--gp-padding-xl)] pb-[var(--gp-padding-l)] md:pb-[var(--gp-padding-xl)]">
          <div
            className="w-full relative overflow-hidden rounded-[var(--gp-radius-lg)]"
            style={{ height: "186.75px" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 480px, 332px"
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Description Text */}
            {description && (
              <p className="absolute bottom-0 left-0 right-0 p-[var(--gp-padding-l)] text-[14px] leading-[22px] text-white">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}