"use client";

import Image from "next/image";
import CartCounterButton from "@/component/ui/CartCounterButton";

export default function DishDetailModal({ dish, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !dish) return null;

  const restaurant = {
    id: dish.restaurantId,
    name: dish.kitchenName,
    slug: dish.restaurantSlug,
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in cursor-pointer"
    >
      <div
        className="w-full max-w-[480px] sm:max-w-[768px] bg-white rounded-t-3xl p-5 flex flex-col gap-4 animate-slide-up shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default"
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

        <h2 className="text-lg font-bold text-[#03130a] border-b border-[#eff1f0] pb-2">
          {dish.kitchenName || "The Saffron Room"}
        </h2>

        <div className="w-full h-[200px] sm:h-[260px] relative rounded-2xl overflow-hidden border border-slate-100 shadow-xs">
          <Image
            src={dish.image || "/food-items/restaurant.jpg"}
            alt={dish.name}
            fill
            className="object-cover object-center"
          />
        </div>

        <h3 className="text-lg font-bold text-[#03130a]">
          {dish.name}
        </h3>

        <div className="flex items-center justify-between border-y border-[#eff1f0] py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[#03130a]">
              ₹ {dish.price}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#03130a]">
              <Image
                src="/restaurant/star.svg"
                alt="Star"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
              <span>{dish.rating || 4.6}</span>
            </div>
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

          <CartCounterButton restaurant={restaurant} item={dish} />
        </div>

        <p className="text-xs text-[#6b7971] leading-relaxed font-normal pb-2">
          {dish.description ||
            "Savor our exquisite Hyderabadi Biryani, featuring aromatic basmati rice, succulent marinated meat, and a delicate blend of traditional spices, all slow-cooked to perfection in a 5-star style."}
        </p>
      </div>
    </div>
  );
}