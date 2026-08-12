"use client";

import { useEffect } from "react";
import Image from "next/image";
import { MdClose, MdStar, MdOutlineDeliveryDining, MdOutlineSchedule } from "react-icons/md";

export default function MenuDetailModal({ item, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute backdrop-blur-[3px] inset-0 bg-black/60" onClick={onClose} />

      {/* Bottom Sheet Content */}
      <div className="relative p-2 bg-white w-full  rounded-t-[10px] z-10">
        {/* Close button - centered above card */}
        <button
          onClick={onClose}
          className="absolute -top-[48px] left-1/2 -translate-x-1/2 w-[40px] h-[40px] flex items-center justify-center bg-white rounded-full cursor-pointer z-10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        >
          <MdClose className="w-6 h-6 text-[var(--gp-color-text-neutral-primary)]" />
        </button>

        {/* Content Card - slides up from bottom */}
        <div className="w-full bg-white rounded-t-[24px] animate-slide-up">
        {/* Food Image */}
        <div className="w-full h-[200px] relative">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="100vw"
              className="object-cover rounded-t-[12px] p-2 "
            />
          ) : (
            <div className="w-full h-full bg-[var(--gp-color-bg-neutral-secondary)] rounded-t-[24px]" />
          )}
        </div>

        {/* Item Details */}
        <div className="flex flex-col gap-[16px] p-[16px]">
          {/* Name */}
          <h2 className="text-[24px] font-semibold text-[var(--gp-color-text-neutral-primary)] leading-[32px]">
            {item.name}
          </h2>

          {/* Price, Rating, Icons, ADD */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <span className="text-[18px] font-semibold text-[var(--gp-color-text-neutral-primary)]">
                ₹{item.price}
              </span>
              {item.rating > 0 && (
                <div className="flex items-center gap-[4px]">
                  <MdStar className="w-[16px] h-[16px] text-[var(--gp-color-warning)]" />
                  <span className="text-[14px] font-medium text-[var(--gp-color-text-neutral-primary)]">
                    {item.rating}
                  </span>
                </div>
              )}
              <MdOutlineDeliveryDining className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
              <MdOutlineSchedule className="w-[16px] h-[16px] text-[var(--gp-color-text-neutral-tertiary)]" />
            </div>
            <button className="flex items-center gap-[8px] h-[40px] px-[20px] bg-white rounded-[8px] border border-[var(--gp-color-brand-primary)] cursor-pointer hover:bg-[var(--gp-color-bg-brand-secondary)] transition-colors">
              <span className="text-[18px] text-[var(--gp-color-brand-primary)]">+</span>
              <span className="text-[16px] font-semibold text-[var(--gp-color-brand-primary)] uppercase">
                ADD
              </span>
            </button>
          </div>

          {/* Description */}
          <p className="text-[14px] leading-[22px] text-[var(--gp-color-text-neutral-secondary)]">
            Savor our exquisite {item.name}, featuring aromatic basmati rice, succulent marinated meat, and a delicate blend of traditional spices, all slow-cooked to perfection in a 5-star style.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}