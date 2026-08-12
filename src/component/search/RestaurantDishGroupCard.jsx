"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RestaurantDishGroupCard({
  restaurant,
  dishes = [],
  onSelectDish,
  onAddToCart,
}) {
  const router = useRouter();
  if (!restaurant) return null;

  return (
    <div className="w-full bg-white border border-[#e0e3e1] rounded-2xl p-4 flex flex-col gap-4 shadow-xs">
      <div
        onClick={() => router.push("/home/restaurant-list")}
        className="flex items-start justify-between gap-2 border-b border-[#eff1f0] pb-3 cursor-pointer group"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-[#03130a] group-hover:text-[#fe480b] transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-xs text-[#6b7971] line-clamp-2">
            {restaurant.description}
          </p>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-red-50 group-hover:text-[#fe480b] transition-colors">
          <Image
            src="/kitchen/arrow_right.svg"
            alt="Arrow Right"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            onClick={() => onSelectDish && onSelectDish(dish)}
            className="w-[240px] border border-[#e0e3e1] rounded-xl p-3 flex flex-col gap-2 shrink-0 bg-white shadow-2xs hover:border-[#fe480b]/40 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <Image
                  src={dish.isVeg ? "/restaurant/veg_badge.svg" : "/restaurant/nonveg_badge.svg"}
                  alt="Veg"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 object-contain"
                />
                <h4 className="text-xs font-bold text-[#03130a] line-clamp-2">
                  {dish.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#03130a]">
                  <Image
                    src="/restaurant/star.svg"
                    alt="Star"
                    width={12}
                    height={12}
                    className="w-3 h-3 object-contain"
                  />
                  <span>{dish.rating || 4.6}</span>
                </div>
                <div className="text-xs font-bold text-[#03130a] mt-1">
                  ₹ {dish.price}
                </div>
              </div>

              <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0 border border-slate-100">
                <Image
                  src={dish.image || "/food-items/restaurant.jpg"}
                  alt={dish.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* ADD Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(dish);
              }}
              className="w-full py-1 border border-[#fe480b] text-[#fe480b] hover:bg-red-50 rounded-lg text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <Image
                src="/kitchen/plus.svg"
                alt="Add"
                width={12}
                height={12}
                className="w-3 h-3 object-contain"
              />
              <span>add</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
