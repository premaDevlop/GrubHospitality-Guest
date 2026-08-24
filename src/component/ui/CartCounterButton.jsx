"use client";

import { useCart } from "@/component/providers/CartProvider";

export default function CartCounterButton({ restaurant, item, addClassName = "" }) {
  const { items, addToCart, updateQty } = useCart();
  const entry = items.find(
    (e) => e.restaurant.id === restaurant.id && e.item.id === item.id,
  );
  const qty = entry?.qty || 0;

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(restaurant, item);
        }}
        className={`flex items-center gap-[8px] h-[36px] px-[16px] bg-white rounded-[8px] border border-[var(--gp-color-brand-primary)] cursor-pointer hover:bg-[var(--gp-color-bg-brand-secondary)] transition-colors ${addClassName}`}
      >
        <span className="text-[16px] leading-none text-[var(--gp-color-brand-primary)]">
          +
        </span>
        <span className="text-[14px] font-semibold text-[var(--gp-color-brand-primary)] uppercase">
          ADD
        </span>
      </button>
    );
  }

  return (
    <div
      className="flex items-center h-[36px] rounded-[8px] border border-[var(--gp-color-brand-primary)] overflow-hidden bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => updateQty(restaurant.id, item.id, -1)}
        className="w-[36px] h-full flex items-center justify-center text-[var(--gp-color-brand-primary)] text-[18px] font-bold hover:bg-[var(--gp-color-bg-brand-secondary)] cursor-pointer transition-colors"
      >
        −
      </button>
      <span className="w-[36px] text-center text-[14px] font-semibold text-[var(--gp-color-text-neutral-primary)] select-none">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => updateQty(restaurant.id, item.id, 1)}
        className="w-[36px] h-full flex items-center justify-center text-[var(--gp-color-brand-primary)] text-[18px] font-bold hover:bg-[var(--gp-color-bg-brand-secondary)] cursor-pointer transition-colors"
      >
        +
      </button>
    </div>
  );
}