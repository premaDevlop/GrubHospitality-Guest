"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OrderStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPlaced = searchParams.get("placed") === "true";
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col items-center">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#eff1f0]">
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Back to home"
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
          <h1 className="text-base font-bold text-[#03130a]">Order Status</h1>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
          {/* Success animation */}
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#16a34a" opacity="0.15" />
              <path
                d="M8 12.5L10.5 15L16 9.5"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#03130a]">Order Placed!</h2>
            <p className="text-sm text-[#6b7971] leading-relaxed">
              We&apos;ve successfully{" "}
              <span className="text-green-600 font-semibold">received</span> your order.
              <br />
              Your food will be delivered to your room.
            </p>
          </div>

          {/* Estimated delivery card */}
          <div className="w-full border border-[#e0e3e1] rounded-2xl p-4 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#fe480b" strokeWidth="1.5" />
                  <path d="M12 7v5l3 2" stroke="#fe480b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-bold text-[#03130a]">Estimated Delivery</span>
              </div>
              <span className="text-sm font-bold text-[#fe480b]">20-30 min</span>
            </div>
            <div className="h-px bg-[#eff1f0]" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b7971]">Status</span>
              <span className="text-green-600 font-semibold">Preparing your food</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="w-full py-3.5 bg-[#fe480b] text-white rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-[#e4450a] transition-colors"
              id="back-to-home-btn"
            >
              Back to Home
            </button>
            <button
              type="button"
              onClick={() => router.push("/help")}
              className="w-full py-3.5 border border-[#e0e3e1] text-[#6b7971] rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-[#f7f8fa] transition-colors"
              id="need-help-btn"
            >
              Need Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-[#fe480b] border-t-transparent rounded-full animate-spin" /></div>}>
      <OrderStatusContent />
    </Suspense>
  );
}