"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RestaurantCard({ restaurant }) {
  const router = useRouter();

  if (!restaurant) return null;

  return (
    <article className="w-full bg-white border border-[#e0e3e1] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200">
      {/* Card Top Image */}
      <div className="relative w-full h-[180px] sm:h-[260px]">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover object-center"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 text-white">
          <Image
            src="/restaurant/key.svg"
            alt="Clock/Key"
            width={12}
            height={12}
            className="w-3 h-3 object-contain"
          />
          <span className="text-[11px] font-medium tracking-wide">
            {restaurant.timing}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-bold text-[#03130a]">
          {restaurant.name}
        </h3>
        <p className="text-xs text-[#6b7971] font-normal leading-relaxed">
          {restaurant.description}
        </p>

        {/* Card Footer Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#eff1f0] mt-1">
          <div className="flex items-center gap-2 text-xs font-medium text-[#6b7971]">
            <Image
              src="/restaurant/bell.svg"
              alt="Cuisine"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span>{restaurant.cuisine}</span>
          </div>

          <button
            type="button"
            onClick={() => router.push(`/kitchen/${restaurant.slug}`)}
            className="px-3.5 py-1.5 border border-[#FF3333] text-[#FF3333] hover:bg-red-50 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer"
          >
            VIEW MENU
          </button>
        </div>
      </div>
    </article>
  );
}
