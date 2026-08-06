"use client";

import Image from "next/image";

export default function DishCard({ dish, onSelectDish, onAddToCart }) {
  if (!dish) return null;

  return (
    <div
      onClick={() => onSelectDish && onSelectDish(dish)}
      className="w-full bg-white border border-[#e0e3e1] rounded-2xl p-4 flex items-start justify-between gap-4 shadow-xs hover:border-[#fe480b]/30 transition-all cursor-pointer"
    >
      {/* Left Details */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        {/* Veg / NonVeg Badge Icon */}
        <div className="flex items-center gap-1.5">
          <Image
            src={dish.isVeg ? "/restaurant/veg_badge.svg" : "/restaurant/nonveg_badge.svg"}
            alt={dish.isVeg ? "Veg" : "Non-Veg"}
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>

        {/* Dish Title */}
        <h3 className="text-base font-bold text-[#03130a] leading-tight truncate">
          {dish.name}
        </h3>

        {/* Kitchen Name */}
        <span className="text-xs text-[#6b7971] font-medium">
          {dish.kitchenName || "Kitchen Name"}
        </span>

        {/* Rating & Badges Row */}
        <div className="flex items-center gap-2 mt-0.5 text-xs font-semibold text-[#03130a]">
          <div className="flex items-center gap-1">
            <Image
              src="/restaurant/star.svg"
              alt="Star"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <span className="text-[#03130a]">{dish.rating || 4.6}</span>
          </div>

          {/* Badges / Icons */}
          <div className="flex items-center gap-1 opacity-70">
            <Image
              src="/restaurant/key.svg"
              alt="Package"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <Image
              src="/restaurant/leaf.svg"
              alt="Leaf"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
          </div>
        </div>

        {/* Price Row */}
        <div className="mt-2 text-base font-bold text-[#03130a]">
          ₹ {dish.price}
        </div>
      </div>

      {/* Right Column: Dish Cover Image & ADD Button */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-xl overflow-hidden border border-slate-100 shadow-xs">
          <Image
            src={dish.image || "/food-items/restaurant.jpg"}
            alt={dish.name}
            fill
            className="object-cover object-center"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(dish);
          }}
          className="w-full py-1.5 px-3 border border-[#fe480b] text-[#fe480b] hover:bg-red-50 rounded-lg text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span className="text-sm font-semibold">+</span> ADD
        </button>
      </div>
    </div>
  );
}
