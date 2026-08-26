"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/component/providers/CartProvider";

const CART_BAR_HEIGHT = 80;

// ---- Icon helpers ----
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="#9ca8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PrepIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4v6l4 2" stroke="#9ca8a2" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ReadyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" fill="#9ca8a2" />
    </svg>
  );
}
function DeliverIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="#9ca8a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---- Timeline step ----
function TimelineStep({ icon, title, subtitle, isFirst, isLast, isDone, timestamp }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center" style={{ minWidth: 32 }}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
            isDone ? "border-green-500 bg-white" : "border-[#e0e3e1] bg-white"
          }`}
        >
          {isDone ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            icon
          )}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 mb-1"
            style={{ minHeight: 28, background: isDone ? "#22c55e" : "#e0e3e1" }}
          />
        )}
      </div>
      <div className="flex-1 pb-3">
        <div className="flex items-baseline justify-between">
          <span className={`text-sm font-semibold ${isDone ? "text-[#03130a]" : "text-[#6b7971]"}`}>
            {title}
          </span>
          {isFirst && timestamp && (
            <span className="text-xs text-[#6b7971] font-medium">{timestamp}</span>
          )}
        </div>
        <p className="text-xs text-[#9ca8a2] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

// ---- Step builders ----
function buildInstantSteps(orderTime) {
  const timestamp =
    orderTime ||
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  return [
    { id: "accepted", title: "Order Accepted", subtitle: "Done", icon: <CheckIcon />, done: true, timestamp },
    { id: "prepared", title: "Order Prepared", subtitle: "In Process...", icon: <PrepIcon />, done: false },
    { id: "ready", title: "Order Ready", subtitle: "Est. 15 Minutes", icon: <ReadyIcon />, done: false },
    { id: "delivered", title: "Order Delivered", subtitle: "Est. 25 Minutes", icon: <DeliverIcon />, done: false },
  ];
}

// ---- Main reusable component ----
export default function OrderStatusPanel() {
  const router = useRouter();
  const { activeOrder, itemCount } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  // Only show when there is an active order
  if (!activeOrder) return null;

  const steps = buildInstantSteps(activeOrder.time);
  const primaryMessage = "We've successfully received your order.";
  const hasCartItems = itemCount > 0;

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[1.5px]"
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ${
          isExpanded
            ? "w-full px-0 pb-0 pt-0 z-[9999] bottom-0"
            : `w-full max-w-[480px] sm:max-w-[768px] px-4 pt-0 z-40 ${
                hasCartItems ? "pb-4" : "pb-4"
              }`
        }`}
        style={isExpanded ? undefined : { bottom: hasCartItems ? `${CART_BAR_HEIGHT}px` : "0px" }}
      >
        {isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-[#e0e3e1] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#f7f8fa] transition-colors z-10 pointer-events-auto"
            aria-label="Close order status panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#03130a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div
          className={`bg-white border border-[#e0e3e1] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] pointer-events-auto overflow-hidden transition-all duration-300 ${
            isExpanded ? "rounded-none" : "rounded-xl"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsExpanded((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
            aria-expanded={isExpanded}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#6b7971" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="9" y="3" width="6" height="4" rx="1" stroke="#6b7971" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-bold text-[#03130a]">Order Status</span>
              </div>
              <p className="text-xs text-[#6b7971] mt-0.5 pl-[26px]">{primaryMessage}</p>
            </div>

            {!isExpanded && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 shrink-0 rotate-180"
              >
                <path d="M6 9L12 15L18 9" stroke="#6b7971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 pt-1 border-t border-[#f0f0f0]">
              <div className="flex flex-col gap-0">
                {steps.map((step, idx) => (
                  <TimelineStep
                    key={step.id}
                    icon={step.icon}
                    title={step.title}
                    subtitle={step.subtitle}
                    isFirst={idx === 0}
                    isLast={idx === steps.length - 1}
                    isDone={step.done}
                    timestamp={step.timestamp}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => router.push("/order-status")}
                className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-widest text-[#03130a] cursor-pointer hover:opacity-70 transition-opacity"
              >
                VIEW DETAILS
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
