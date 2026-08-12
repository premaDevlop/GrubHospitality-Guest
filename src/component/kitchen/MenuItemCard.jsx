"use client";

import Image from "next/image";
import { MdStar, MdOutlineDeliveryDining, MdOutlineSchedule } from "react-icons/md";

function VegIndicator({ isVeg = true }) {
  if (isVeg) {
    return (
      <div className="w-[16px] h-[16px] border-2 border-green-600 rounded-sm flex items-center justify-center">
        <div className="w-[8px] h-[8px] bg-green-600 rounded-full" />
      </div>
    );
  }
  return (
    <div className="w-[16px] h-[16px] border-2 border-red-600 rounded-sm flex items-center justify-center">
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-600" />
    </div>
  );
}

export default function MenuItemCard({
  name = "Menu Item",
  description = "",
  rating = 0,
  price = 0,
  isVeg = true,
  image = null,
  onAdd,
  onClick,
}) {
  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd?.();
  };

  const addButton = (
    <button
      onClick={handleAdd}
      className="flex items-center gap-[8px] h-[36px] px-[16px] bg-white rounded-[8px] border border-[var(--gp-color-brand-primary)] cursor-pointer hover:bg-[var(--gp-color-bg-brand-secondary)] transition-colors"
    >
      <span className="text-[16px] text-[var(--gp-color-brand-primary)]">+</span>
      <span className="text-[14px] font-semibold text-[var(--gp-color-brand-primary)] uppercase">
        ADD
      </span>
    </button>
  );

  if (image) {
    return (
      <div
        onClick={onClick}
                className="w-full flex flex-col gap-[var(--gp-space-s)] p-[var(--gp-padding-l)] md:p-[var(--gp-padding-xl)] bg-white cursor-pointer md:min-h-[220px]"
        style={{ minHeight: "182px" }}
      >
        <div className="flex gap-[var(--gp-space-s)]">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-[var(--gp-text-spacing-narrow)]">
            <VegIndicator isVeg={isVeg} />
            <h3 className="text-[16px] md:text-[20px] font-semibold text-[var(--gp-color-text-neutral-primary)] leading-[24px] md:leading-[28px]">
              {name}
            </h3>
            {description && (
              <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[var(--gp-color-text-neutral-secondary)] line-clamp-2">
                {description}
              </p>
            )}
            <div className="flex items-center gap-[var(--gp-space-s)] mt-[4px]">
              {rating > 0 && (
                <div className="flex items-center gap-[4px]">
                  <MdStar className="w-[16px] h-[16px] text-[var(--gp-color-warning)]" />
                  <span className="text-[14px] font-medium text-[var(--gp-color-text-neutral-primary)]">
                    {rating}
                  </span>
                </div>
              )}
              <MdOutlineDeliveryDining className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
              <MdOutlineSchedule className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
            </div>
            <div className="mt-auto pt-[var(--gp-space-s)]">
              <span className="text-[16px] md:text-[18px] font-semibold text-[var(--gp-color-text-neutral-primary)]">
                ₹{price}
              </span>
            </div>
          </div>
          {/* Right Image + ADD */}
          <div className="flex flex-col items-end gap-[var(--gp-space-s)] shrink-0">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] relative rounded-[var(--gp-radius-base)] overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 768px) 160px, 120px"
                className="object-cover"
              />
            </div>
            {addButton}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
              className="w-full flex flex-col gap-[var(--gp-space-s)] p-[var(--gp-padding-l)] md:p-[var(--gp-padding-xl)] bg-white cursor-pointer md:min-h-[220px]"
      style={{ minHeight: "182px" }}
    >
      <div className="flex flex-col gap-[var(--gp-text-spacing-narrow)]">
        <VegIndicator isVeg={isVeg} />
        <h3 className="text-[16px] md:text-[20px] font-semibold text-[var(--gp-color-text-neutral-primary)] leading-[24px] md:leading-[28px]">
          {name}
        </h3>
        {description && (
          <p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[var(--gp-color-text-neutral-secondary)] line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-[var(--gp-space-s)] mt-[4px]">
          {rating > 0 && (
            <div className="flex items-center gap-[4px]">
              <MdStar className="w-[16px] h-[16px] text-[var(--gp-color-warning)]" />
              <span className="text-[14px] font-medium text-[var(--gp-color-text-neutral-primary)]">
                {rating}
              </span>
            </div>
          )}
          <MdOutlineDeliveryDining className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
          <MdOutlineSchedule className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
        </div>
      </div>
      {/* Price + ADD row for no-image cards */}
      <div className="flex items-center justify-between mt-auto pt-[var(--gp-space-s)]">
        <span className="text-[16px] md:text-[18px] font-semibold text-[var(--gp-color-text-neutral-primary)]">
          ₹{price}
        </span>
        {addButton}
      </div>
    </div>
  );
}