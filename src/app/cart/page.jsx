"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/component/providers/CartProvider";
import ScheduleOrderModal from "@/component/ui/ScheduleOrderModal";
import SwitchRoomModal from "@/component/ui/SwitchRoomModal";
import data from "@/data/data.json";

// Veg / Non-veg indicator dot
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

// Qty stepper for cart
function QtyStepper({ qty, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrease}
        className="w-7 h-7 flex items-center justify-center text-[#fe480b] text-lg font-bold cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="text-sm font-semibold text-[#03130a] min-w-[16px] text-center">
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="w-7 h-7 flex items-center justify-center text-[#fe480b] text-lg font-bold cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

// Scalloped bill summary card
function BillSummaryCard({ subtotal }) {
  return (
    <div
      className="relative w-full min-h-[260px] mx-auto"
      style={{
        width: "calc(100% + 19px)",
        marginLeft: "-8px",
        backgroundImage: "url('/kitchen/subtract.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-11 py-9 flex flex-col gap-3">
        <div>
          <h2 className="text-sm font-bold text-[#03130a]">Bill Summary</h2>
          <p className="text-xs text-[#6b7971] mt-0.5">
            Your total amount to pay{" "}
            <span className="text-green-600 font-semibold">₹{subtotal}</span>
          </p>
        </div>
        <div className="h-px bg-[#eff1f0]" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6b7971]">Items Total</span>
          <span className="font-semibold text-[#03130a]">₹{subtotal}</span>
        </div>
        <p className="text-[11px] text-[#6b7971]">
          *Bill will be added to your hotel bill.
        </p>
        <div className="h-px" style={{ borderTop: "1px dashed #e0e3e1" }} />
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-[#03130a]">Grand Total</span>
          <span className="font-bold text-[#03130a]">₹{subtotal}</span>
        </div>
      </div>
    </div>
  );
}

// Delivery details section
function DeliveryDetails({ orderId, onChangeRoom, selectedRoom }) {
  const user = data.user;
  return (
    <div className="px-5 py-5 flex flex-col gap-3">
      <div>
        <h2 className="text-sm font-bold text-[#03130a]">Delivery Details</h2>
        <p className="text-xs text-[#6b7971] mt-0.5">Order ID #{orderId}</p>
      </div>
      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#03130a]">20-30 Minutes</span>
          <span className="text-xs text-[#6b7971]">Estimated Delivery</span>
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#03130a]">
              {selectedRoom || user.room}
            </span>
          </div>
          <span className="text-xs text-[#6b7971]">
            Room No.{" "}
            <button
              type="button"
              onClick={onChangeRoom}
              className="text-xs underline text-[#fe480b] font-semibold cursor-pointer hover:underline"
              id="change-room-btn"
            >
              Change
            </button>
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#03130a]">
            {user.reservationId}
          </span>
          <span className="text-xs text-[#6b7971]">Guest ID</span>
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="font-semibold text-[#03130a]">{user.guestName}</span>
          <span className="text-xs text-[#6b7971]">Guest Name</span>
        </div>
      </div>
    </div>
  );
}

// ADD INSTRUCTION button
function AddInstructionButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 border border-[#fe480b] rounded-lg px-4 py-2 cursor-pointer hover:bg-red-50 transition-colors"
      id="add-instruction-btn"
    >
      {/* Pencil icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          stroke="#fe480b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          stroke="#fe480b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xs font-semibold text-[#fe480b] uppercase tracking-wide">
        Add Instruction
      </span>
    </button>
  );
}

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    updateQty,
    kitchenNotes,
    orderInstruction,
    setKitchenNote,
    setOrderInstruction,
    placeOrder,
  } = useCart();

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduledFor, setScheduledFor] = useState(null);
  const [showInstructionFor, setShowInstructionFor] = useState(null); // restaurantId | 'global'
  const [isRoomSwitchOpen, setIsRoomSwitchOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(data.user.room);

  // Generate unique order ID once per cart session
  const [orderId] = useState(
    () => `${Math.floor(100000 + Math.random() * 900000)}`,
  );

  // Group items by restaurant
  const grouped = Object.values(
    items.reduce((groups, entry) => {
      const key = entry.restaurant.id;
      if (!groups[key]) {
        groups[key] = { restaurant: entry.restaurant, entries: [] };
      }
      groups[key].entries.push(entry);
      return groups;
    }, {}),
  );

  const isMultiKitchen = grouped.length > 1;

  const handleOrderNow = () => {
    placeOrder();
    router.push("/order-status?placed=true");
  };

  const handleScheduleConfirm = (schedule) => {
    setScheduledFor(schedule);
    // Place the order and navigate back to the kitchen with schedule info
    placeOrder();
    // Find the restaurant slug from the first grouped item
    const restaurantSlug = grouped[0]?.restaurant?.slug;
    if (restaurantSlug) {
      const params = new URLSearchParams({
        orderPlaced: "true",
        scheduled: "true",
        time: schedule.time,
        day: schedule.date.day,
        month: schedule.date.month,
      });
      router.push(`/kitchen/${restaurantSlug}?${params.toString()}`);
    } else {
      router.push(`/home?orderPlaced=true&scheduled=true`);
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col items-center">
        <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#eff1f0]">
            <button
              type="button"
              onClick={() => router.back()}
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
            <h1 className="text-base font-bold text-[#03130a]">Cart</h1>
          </div>
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center px-8 flex-1">
            <div className="w-16 h-16 rounded-full bg-[#f7f8fa] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="#6b7971"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6h18M16 10a4 4 0 01-8 0"
                  stroke="#6b7971"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-[#03130a]">
                Your cart is empty
              </h2>
              <p className="text-sm text-[#6b7971]">
                Add dishes from any restaurant to get started.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="mt-2 px-6 py-2.5 border border-[#fe480b] text-[#fe480b] hover:bg-red-50 rounded-xl text-sm font-bold uppercase transition-colors cursor-pointer"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col items-center">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-[#f7f8fa] flex flex-col pb-28">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[#eff1f0]">
          <button
            type="button"
            onClick={() => router.back()}
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
          <h1 className="text-base font-bold text-[#03130a]">Cart</h1>
        </div>

        {/* Scheduled banner */}
        {scheduledFor && (
          <div className="mx-4 mt-3 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#16a34a"
                strokeWidth="1.5"
              />
              <path
                d="M12 6v6l4 2"
                stroke="#16a34a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-semibold text-green-700">
              Scheduled for {scheduledFor.date.day} {scheduledFor.date.month} at{" "}
              {scheduledFor.time}
            </span>
            <button
              type="button"
              onClick={() => setScheduledFor(null)}
              className="ml-auto text-xs text-green-600 underline cursor-pointer"
            >
              Change
            </button>
          </div>
        )}

        {/* Items Section */}
        <div className="mt-3 mx-4 bg-white rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-sm font-bold text-[#03130a]">Items</h2>
          </div>

          {grouped.map(({ restaurant, entries }, gIdx) => (
            <div key={restaurant.id}>
              {/* Kitchen name label — only for multi-kitchen */}
              {isMultiKitchen && (
                <div className="px-5 pt-3 pb-1">
                  <span className="text-xs font-bold text-[#03130a] uppercase tracking-wide">
                    {restaurant.name}
                  </span>
                </div>
              )}

              {/* Item rows */}
              {entries.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex items-center justify-between px-5 py-4 border-t border-dashed border-[#e0e3e1]"
                >
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <VegDot isVeg={entry.item.isVeg !== false} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-[#03130a] leading-tight truncate">
                        {entry.item.name}
                      </span>
                      <span className="text-xs text-[#6b7971] mt-0.5">
                        ₹{entry.item.price}
                      </span>
                    </div>
                  </div>
                  <QtyStepper
                    qty={entry.qty}
                    onDecrease={() =>
                      updateQty(restaurant.id, entry.item.id, -1)
                    }
                    onIncrease={() =>
                      updateQty(restaurant.id, entry.item.id, 1)
                    }
                  />
                </div>
              ))}

              {/* Per-kitchen ADD INSTRUCTION (multi-kitchen only) */}
              {isMultiKitchen && (
                <div className="px-5 pb-4 pt-2">
                  {showInstructionFor === restaurant.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={kitchenNotes[restaurant.id] || ""}
                        onChange={(e) =>
                          setKitchenNote(restaurant.id, e.target.value)
                        }
                        placeholder="Add Note"
                        rows={3}
                        className="w-full border border-[#e0e3e1] rounded-lg px-3 py-2 text-sm text-[#03130a] placeholder:text-[#b0b8b4] outline-none resize-none focus:border-[#fe480b] transition-colors"
                        id={`kitchen-note-${restaurant.id}`}
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowInstructionFor(null)}
                          className="flex items-center gap-1.5 border border-[#fe480b] text-[#fe480b] rounded-lg px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-red-50 transition-colors"
                          id={`submit-note-${restaurant.id}`}
                        >
                          Submit
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#fe480b"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <AddInstructionButton
                      onClick={() => setShowInstructionFor(restaurant.id)}
                    />
                  )}
                </div>
              )}

              {/* Divider between kitchens */}
              {isMultiKitchen && gIdx < grouped.length - 1 && (
                <div className="h-2 bg-[#f7f8fa]" />
              )}
            </div>
          ))}

          {/* Single-kitchen ADD INSTRUCTION */}
          {!isMultiKitchen && (
            <div className="px-5 pb-4 pt-2 border-t border-dashed border-[#e0e3e1]">
              {showInstructionFor === "global" ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={orderInstruction}
                    onChange={(e) => setOrderInstruction(e.target.value)}
                    placeholder="Add special instructions for your order..."
                    rows={3}
                    className="w-full border border-[#e0e3e1] rounded-lg px-3 py-2 text-sm text-[#03130a] placeholder:text-[#b0b8b4] outline-none resize-none focus:border-[#fe480b] transition-colors"
                    id="order-instruction-input"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowInstructionFor(null)}
                      className="flex items-center gap-1.5 border border-[#fe480b] text-[#fe480b] rounded-lg px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-red-50 transition-colors"
                    >
                      Submit
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#fe480b"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <AddInstructionButton
                  onClick={() => setShowInstructionFor("global")}
                />
              )}
            </div>
          )}
        </div>

        {/* Bill Summary (scalloped ticket style) */}
        <div className=" mx-auto  mx-4 w-full">
          <BillSummaryCard subtotal={subtotal} />
        </div>

        {/* Delivery Details */}
        <div className=" mx-4  bg-white rounded-2xl">
          <DeliveryDetails
            orderId={orderId}
            selectedRoom={selectedRoom}
            onChangeRoom={() => setIsRoomSwitchOpen(true)}
          />
        </div>
      </div>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[768px] bg-white border-t border-[#eff1f0] px-4 py-3 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsScheduleOpen(true)}
            className="flex-1 py-3.5 border-2 border-[#fe480b] text-[#fe480b] rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer hover:bg-red-50 transition-colors"
            id="schedule-order-btn"
          >
            Schedule Order
          </button>
          <button
            type="button"
            onClick={handleOrderNow}
            className="flex-1 py-3.5 bg-[#fe480b] text-white rounded-xl text-xs font-bold uppercase tracking-wide cursor-pointer hover:bg-[#e4450a] transition-colors"
            id="order-now-btn"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleOrderModal
        key={isScheduleOpen ? "schedule-open" : "schedule-closed"}
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleScheduleConfirm}
      />

      {/* Switch Room Modal */}
      <SwitchRoomModal
        key={isRoomSwitchOpen ? `room-open-${selectedRoom}` : "room-closed"}
        isOpen={isRoomSwitchOpen}
        onClose={() => setIsRoomSwitchOpen(false)}
        currentRoom={selectedRoom}
        onConfirm={(room) => setSelectedRoom(room)}
      />
    </div>
  );
}
