"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/component/providers/CartProvider";

export default function CartCheckoutBar() {
  const router = useRouter();
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[768px] px-4 pb-4 z-40 pointer-events-none">
      <button
        type="button"
        onClick={() => router.push("/cart")}
        className="pointer-events-auto w-full flex items-center justify-between bg-white border border-[#fe480b] rounded-xl px-4 py-3.5 shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
        id="cart-checkout-bar"
      >
        {/* Left: icon + count */}
        <div className="flex items-center gap-3">
          {/* Bell/plate icon */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11C2 6.02944 6.02944 2 11 2H13C17.9706 2 22 6.02944 22 11V13H2V11Z"
                fill="#fe480b"
                opacity="0.15"
              />
              <rect x="2" y="13" width="20" height="2" rx="1" fill="#fe480b" />
              <rect x="9" y="17" width="6" height="4" rx="1" fill="#fe480b" opacity="0.6" />
              <circle cx="12" cy="2" r="1.5" fill="#fe480b" />
              <path
                d="M4 11C4 7.13401 7.13401 4 11 4H13C16.866 4 20 7.13401 20 11"
                stroke="#fe480b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#03130a]">
            {itemCount} item{itemCount > 1 ? "s" : ""} added
          </span>
        </div>

        {/* Right: CHECKOUT */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-[#fe480b] uppercase tracking-wide">
            Checkout
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#fe480b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
