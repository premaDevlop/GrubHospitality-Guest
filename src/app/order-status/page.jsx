"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/component/providers/CartProvider";
import { useRoom } from "@/component/providers/RoomProvider";

function VegDot({ isVeg = true }) {
  if (isVeg) {
    return (
      <div className="w-[14px] h-[14px] border-2 border-green-600 rounded-sm flex items-center justify-center shrink-0">
        <div className="w-[6px] h-[6px] bg-green-600 rounded-full" />
      </div>
    );
  }
  return (
    <div className="w-[14px] h-[14px] border-2 border-red-600 rounded-sm flex items-center justify-center shrink-0">
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-600" />
    </div>
  );
}

function OrderConfirmContent() {
  const router = useRouter();
  const { activeOrder } = useCart();
  const { selectedRoom } = useRoom();

  const orderId = activeOrder?.id || "#112233";
  const roomNo = selectedRoom || "201";
  const orderItems = activeOrder?.items || [];

  // Get restaurant slug to go back to kitchen with order status panel
  const restaurantSlug = activeOrder?.restaurantSlug;

  const handleBack = () => {
    if (restaurantSlug) {
      router.push(`/kitchen/${restaurantSlug}?orderPlaced=true`);
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col items-center select-none">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-[#f7f8fa] flex flex-col pb-24 relative shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[#eff1f0] shrink-0 z-40">
          <button
            type="button"
            onClick={handleBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#03130a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span
            className="text-sm font-semibold text-[#03130a] cursor-pointer"
            onClick={handleBack}
          >
            Back
          </span>
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">

          {/* Order Confirmed Banner */}
          <div className="flex flex-col items-center text-center py-6">
            <Image
              src="/profile/verified_badge_114.svg"
              alt="Order Confirmed"
              width={76}
              height={76}
              className="w-[76px] h-[76px] object-contain mb-3"
            />
            <h1 className="text-lg font-bold text-[#03130a]">Order Confirmed!</h1>
            <p className="text-xs text-[#6b7971] leading-relaxed max-w-[280px] mt-1">
              Your order has been successfully placed and is being prepared by our kitchen team.
            </p>
          </div>

          {/* Delivery Details Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1]">
            <h3 className="text-sm font-bold text-[#03130a]">Delivery Details</h3>
            <span className="text-xs text-[#6b7971] mt-0.5 block">Order ID {orderId}</span>
            <div className="h-px bg-[#f0f2f1] my-4" />
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#03130a]">20-30 Minutes</span>
                <span className="text-[11px] text-[#6b7971] mt-0.5">Estimated Delivery</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-[#03130a]">{roomNo}</span>
                <span className="text-[11px] text-[#6b7971] mt-0.5">Room No.</span>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          {orderItems.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1] flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#03130a]">Order Details</h3>
              <div className="flex flex-col divide-y divide-[#f0f2f1] border-t border-[#f0f2f1]">
                {orderItems.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <VegDot isVeg={entry.item?.isVeg !== false} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-[#03130a] leading-tight">
                          {entry.item?.name}
                        </span>
                        <span className="text-xs text-[#6b7971] mt-0.5">
                          ₹{entry.item?.price}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#6b7971]">
                      x{entry.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        <div className="absolute bottom-0 left-0 w-full bg-[#f7f8fa] px-4 py-3 shrink-0 z-30">
          <a
            href="tel:+123456789"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF4B4B] text-white rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-red-600 transition-colors"
          >
            <Image
              src="/profile/phone_white.svg"
              alt="Phone"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            Call Reception
          </a>
        </div>

      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-[#fe480b] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrderConfirmContent />
    </Suspense>
  );
}