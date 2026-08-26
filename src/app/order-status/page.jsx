"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/component/providers/CartProvider";
import { useRoom } from "@/component/providers/RoomProvider";
import data from "@/data/data.json";

// Cancel reasons
const CANCEL_REASONS = [
  "Changed my mind",
  "Ordered by mistake",
  "Food taking too long",
  "Duplicate order",
  "Other",
];

// Veg / Non-veg dot
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

// Step circle icon
function StepCheck({ done, cancelled }) {
  if (cancelled) {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-red-500 bg-white flex items-center justify-center shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (done) {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-green-500 bg-white flex items-center justify-center shrink-0">
        <Image src="/profile/check_circle_green.svg" alt="Done" width={18} height={18} className="object-contain" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full border-2 border-[#e0e3e1] bg-white flex items-center justify-center shrink-0">
      <div className="w-2 h-2 rounded-full bg-[#e0e3e1]" />
    </div>
  );
}

// Cancel Modal
function CancelModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-[480px] sm:max-w-[768px] bg-white rounded-t-2xl px-5 pt-5 pb-8 z-10 flex flex-col gap-4">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#e0e3e1] flex items-center justify-center cursor-pointer hover:bg-[#f7f8fa] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#03130a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <Image src="/profile/trash.svg" alt="Cancel" width={22} height={22} className="object-contain" />
          <div>
            <h3 className="text-base font-bold text-[#03130a]">Cancel Order?</h3>
            <p className="text-xs text-[#6b7971] mt-0.5">
              We're sorry to see you cancel. Please let us know the reason so we can do better.
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" fill="#EF4444" />
            <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-red-700 font-medium leading-relaxed">
            Your order will be cancelled immediately. If the food preparation has already started, cancellation may not be possible.
          </p>
        </div>

        {/* Reason dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((p) => !p)}
            className="w-full flex items-center justify-between border border-[#e0e3e1] rounded-xl px-4 py-3 text-sm text-left cursor-pointer"
          >
            <span className={reason ? "text-[#03130a]" : "text-[#9ca8a2]"}>
              {reason || "Select a reason"}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
              <path d="M6 9L12 15L18 9" stroke="#6b7971" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#e0e3e1] rounded-xl mt-1 z-20 overflow-hidden shadow-md">
              {CANCEL_REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setReason(r); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-[#03130a] hover:bg-[#f7f8fa] transition-colors cursor-pointer border-b border-[#f0f2f1] last:border-0"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comments */}
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Additional comments (optional)"
          rows={3}
          className="w-full border border-[#e0e3e1] rounded-xl px-4 py-3 text-sm text-[#03130a] placeholder-[#9ca8a2] resize-none outline-none focus:border-[#fe480b] transition-colors"
        />

        {/* Actions */}
        <button
          type="button"
          disabled={!reason}
          onClick={() => onConfirm({ reason, comments })}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF3333] text-white rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Image src="/profile/trash_white.svg" alt="" width={16} height={16} className="object-contain" />
          Cancel Order
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 border border-[#e0e3e1] text-[#03130a] rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-[#f7f8fa] transition-colors"
        >
          Keep Order
        </button>
      </div>
    </div>
  );
}

// Helper: format scheduled time to 12-hour
function fmt12(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// Helper: add minutes to HH:MM string
function addMinutes(timeStr, mins) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

// Main page
function OrderStatusContent() {
  const router = useRouter();
  const { activeOrder: contextOrder, cancelOrder } = useCart();
  const { selectedRoom } = useRoom();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const activeOrder =
    contextOrder ??
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("grubpac_active_order") || "null")
      : null);

  const isCancelled = activeOrder?.status === "Cancelled";
  const isDelivered = activeOrder?.status === "Delivered";
  const isScheduled = activeOrder?.isScheduled === true;
  const scheduleInfo = activeOrder?.scheduleInfo;

  const orderId = activeOrder?.id || "#112233";
  const roomNo = selectedRoom || "201";
  const orderItems = activeOrder?.items || [];
  const orderTime = activeOrder?.time || "";
  const restaurantSlug = activeOrder?.restaurantSlug;

  // Format scheduled delivery time
  const scheduledTimeStr = scheduleInfo?.time || "";
  const scheduledTimeDisplay = fmt12(scheduledTimeStr);
  const acceptByTime = scheduledTimeStr ? fmt12(addMinutes(scheduledTimeStr, -120)) : "";
  const prepTime = scheduledTimeStr ? fmt12(addMinutes(scheduledTimeStr, -15)) : "";

  const handleBack = () => {
    if (restaurantSlug) {
      router.replace(`/kitchen/${restaurantSlug}?orderPlaced=true`);
    } else {
      router.replace("/home");
    }
  };

  const handleConfirmCancel = ({ reason, comments }) => {
    cancelOrder({ reason, comments });
    setShowCancelModal(false);
  };

  // Build status steps
  const steps = isScheduled
    ? [
        {
          id: "accepted",
          title: "Will be Accepted",
          subtitle: acceptByTime ? `By ${acceptByTime} (2 hours before delivery)` : "2 hours before delivery",
          done: false,
          cancelled: false,
          timestamp: orderTime,
        },
        {
          id: "prepared",
          title: "Order Prepared",
          subtitle: prepTime ? `Will start at ${prepTime}` : "Before your delivery time",
          done: false,
          cancelled: false,
        },
        { id: "ready", title: "Order Ready", subtitle: "Est. 25 Minutes", done: false, cancelled: false },
        { id: "delivery", title: "Order Delivery", subtitle: "Est. 25 Minutes", done: false, cancelled: false },
      ]
    : [
        {
          id: "accepted",
          title: isCancelled ? "Order Cancelled" : "Order Accepted",
          subtitle: isCancelled ? "Cancelled" : "Done",
          done: !isCancelled,
          cancelled: isCancelled,
          timestamp: orderTime,
        },
        { id: "prepared", title: "Order Prepared", subtitle: isDelivered ? "Done" : "In Process...", done: isDelivered, cancelled: false },
        { id: "ready", title: "Order Ready", subtitle: isDelivered ? "Done" : "Est. 15 Minutes", done: isDelivered, cancelled: false },
        { id: "delivery", title: "Order Delivery", subtitle: isDelivered ? "Delivered" : "Est. 25 Minutes", done: isDelivered, cancelled: false },
      ];

  return (
    <>
      <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col items-center select-none">
        <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-[#f7f8fa] flex flex-col pb-32 relative shadow-sm">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[#eff1f0] shrink-0 z-40">
            <button
              type="button"
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#03130a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-[#03130a] cursor-pointer" onClick={handleBack}>Back</span>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">

            {/* Scheduled Banner */}
            {isScheduled && !isCancelled && (
              <div className="flex flex-col items-center text-center py-4">
                <Image
                  src="/profile/schedule_badge.svg"
                  alt="Scheduled"
                  width={76}
                  height={76}
                  className="w-[76px] h-[76px] object-contain mb-3"
                />
                <h1 className="text-lg font-bold text-[#03130a]">Order Scheduled!</h1>
                <p className="text-xs text-[#6b7971] leading-relaxed max-w-[280px] mt-1">
                  Your order has been scheduled successfully. We will start preparing it closer to your selected time.
                </p>
              </div>
            )}

            {/* Cancelled Banner */}
            {isCancelled && (
              <div className="flex flex-col items-center text-center py-4">
                <Image
                  src="/profile/cancel_badge.svg"
                  alt="Cancelled"
                  width={76}
                  height={76}
                  className="w-[76px] h-[76px] object-contain mb-3"
                />
                <h1 className="text-lg font-bold text-[#03130a]">Order Cancelled!</h1>
                <p className="text-xs text-[#6b7971] leading-relaxed max-w-[260px] mt-1">
                  Your order has been cancelled, you can place a new order anytime
                </p>
              </div>
            )}

            {/* Delivered Banner */}
            {isDelivered && !isCancelled && (
              <div className="flex flex-col items-center text-center py-4">
                <Image
                  src="/Delivered.png"
                  alt="Delivered"
                  width={76}
                  height={76}
                  className="w-[76px] h-[76px] object-contain mb-3"
                />
                <h1 className="text-lg font-bold text-[#03130a]">Order Delivered!</h1>
                <p className="text-xs text-[#6b7971] leading-relaxed max-w-[280px] mt-1">
                  Your order has been successfully delivered. Enjoy your meal!
                </p>
              </div>
            )}

            {/* Order Confirmed Banner */}
            {!isScheduled && !isCancelled && !isDelivered && (
              <div className="flex flex-col items-center text-center py-4">
                <Image
                  src="/Done.png"
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
            )}

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1]">
              <h3 className="text-sm font-bold text-[#03130a]">Delivery Details</h3>
              <span className="text-xs text-[#6b7971] mt-0.5 block">Order ID {orderId}</span>
              <div className="h-px bg-[#f0f2f1] my-4" />
              <div className="grid grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#03130a]">
                    {isCancelled ? "Order Cancelled" : isDelivered ? "Order Delivered" : isScheduled ? (scheduledTimeDisplay || "Scheduled") : "20-30 Minutes"}
                  </span>
                  <span className="text-[11px] text-[#6b7971] mt-0.5">
                    {isCancelled ? "Order Status" : isDelivered ? "Order Status" : isScheduled ? "Scheduled Time" : "Estimated Delivery"}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-[#03130a]">{roomNo}</span>
                  <span className="text-[11px] text-[#6b7971] mt-0.5">Room No.</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="text-sm font-bold text-[#03130a]">{data.user?.reservationId}</span>
                  <span className="text-[11px] text-[#6b7971] mt-0.5">Guest ID</span>
                </div>
                <div className="flex flex-col text-right mt-3">
                  <span className="text-sm font-bold text-[#03130a]">{data.user?.name}</span>
                  <span className="text-[11px] text-[#6b7971] mt-0.5">Guest Name</span>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1]">
              <h3 className="text-sm font-bold text-[#03130a] mb-4">Order Status</h3>
              <div className="flex flex-col">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex gap-3 items-start relative">
                    {idx < steps.length - 1 && (
                      <div
                        className="absolute left-[15px] top-[32px] bottom-[-20px] w-0.5"
                        style={{
                          background: step.done ? "#22c55e" : step.cancelled ? "#EF4444" : "#e0e3e1",
                        }}
                      />
                    )}
                    <StepCheck done={step.done} cancelled={step.cancelled} />
                    <div className="flex-1 pb-6 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className={`text-sm font-semibold ${step.done ? "text-[#03130a]" : step.cancelled ? "text-[#03130a]" : "text-[#6b7971]"}`}>
                          {step.title}
                        </span>
                        {idx === 0 && step.timestamp && (
                          <span className="text-xs text-[#6b7971] font-medium">{step.timestamp}</span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${step.cancelled ? "text-red-500 font-semibold" : "text-[#9ca8a2]"}`}>
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            {orderItems.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1]">
                <h3 className="text-sm font-bold text-[#03130a] mb-1">Order Details</h3>
                <div className="flex flex-col divide-y divide-[#f0f2f1] border-t border-[#f0f2f1]">
                  {orderItems.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3.5">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <VegDot isVeg={entry.item?.isVeg !== false} />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-[#03130a] leading-tight">{entry.item?.name}</span>
                          <span className="text-xs text-[#6b7971] mt-0.5">₹{entry.item?.price}</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#6b7971]">x{entry.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancel Reason (after cancellation) */}
            {isCancelled && (activeOrder?.cancelReason || activeOrder?.cancelComments) && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f2f1]">
                <h3 className="text-sm font-bold text-[#03130a] mb-3">Cancel Reason</h3>
                {activeOrder?.cancelReason && (
                  <div className="border border-[#e0e3e1] rounded-xl px-4 py-3 text-sm text-[#03130a] bg-[#f7f8fa] mb-3">
                    {activeOrder.cancelReason}
                  </div>
                )}
                {activeOrder?.cancelComments && (
                  <div className="border border-[#e0e3e1] rounded-xl px-4 py-3 text-sm text-[#6b7971] bg-[#f7f8fa] min-h-[60px]">
                    {activeOrder.cancelComments}
                  </div>
                )}
              </div>
            )}

          </main>

          {/* Fixed Bottom */}
          <div className="absolute bottom-0 left-0 w-full bg-[#f7f8fa] px-4 py-3 flex flex-col gap-2 z-30">
            {!isCancelled && !isDelivered && (
              <button
                type="button"
                onClick={() => {
                  if (restaurantSlug) {
                    router.replace(`/kitchen/${restaurantSlug}?orderPlaced=true`);
                  } else {
                    router.replace("/home");
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF4B4B] text-white rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-red-600 transition-colors"
              >
                Track Order
              </button>
            )}

            {isDelivered && (
              <button
                type="button"
                onClick={() => router.replace("/home")}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF4B4B] text-white rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer hover:bg-red-600 transition-colors"
              >
                Order Again
              </button>
            )}

            {!isCancelled && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full py-3 text-sm font-bold text-[#6b7971] uppercase tracking-wide cursor-pointer hover:text-red-500 transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>

        </div>
      </div>

      {showCancelModal && (
        <CancelModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </>
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
      <OrderStatusContent />
    </Suspense>
  );
}