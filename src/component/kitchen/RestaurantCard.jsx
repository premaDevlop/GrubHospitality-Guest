"use client";

import Image from "next/image";
import { MdOutlineAccessTime } from "react-icons/md";

export default function RestaurantCard({
  image = "/kitchen/kitch.jpg",
  name = "Restaurant Name",
  cuisines = [],
  timing = "",
  description = "",
  isOpen = false,
}) {
  return (
    <div className="w-full min-w-0 flex flex-col">
      {/* Image Section */}
      <div
        className="w-full overflow-hidden"
        style={{ position: "relative", aspectRatio: "412 / 309" }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Open Now Badge */}
        {isOpen && (
          <div className="absolute top-[20px] right-[20px] h-[24px] flex items-center gap-[8px] px-[12px] rounded-full border border-white/40 bg-black/40">
            <span className="text-[12px] font-medium text-white">
              Open Now
            </span>
          </div>
        )}
      </div>

      {/* Hotel Info Section */}
      <div className="w-full flex flex-col gap-[16px] p-[16px] bg-white rounded-[8px] shadow-[0px_0px_4px_rgba(0,0,0,0.1),4px_4px_8px_rgba(0,0,0,0.12)] -mt-[40px] relative z-10 mx-auto max-w-[calc(100%-48px)]">
        {/* Restaurant Name */}
        <h2 className="text-[24px] font-semibold text-[var(--gp-color-text-neutral-primary)] leading-[32px]">
          {name}
        </h2>

        {/* Cuisine Tags and Timing */}
        <div className="flex items-center gap-[8px] flex-wrap">
          {cuisines.map((cuisine, index) => (
            <span key={index} className="flex items-center gap-[8px]">
              <span className="text-[14px] font-medium text-[var(--gp-color-text-brand-primary)]">
                {cuisine}
              </span>
              {index < cuisines.length - 1 && (
                <span className="text-[14px] text-[var(--gp-color-text-neutral-tertiary)]">
                  •
                </span>
              )}
            </span>
          ))}

          {timing && (
            <>
              <span className="text-[14px] text-[var(--gp-color-text-neutral-tertiary)]">
                •
              </span>
              <div className="flex items-center gap-[4px]">
                <MdOutlineAccessTime className="w-4 h-4 text-[var(--gp-color-text-neutral-tertiary)]" />
                <span className="text-[14px] text-[var(--gp-color-text-neutral-tertiary)]">
                  {timing}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-[14px] leading-[22px] text-[var(--gp-color-text-neutral-secondary)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
