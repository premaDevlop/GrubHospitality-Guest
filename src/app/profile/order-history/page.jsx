"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";
import OrderHistoryItemCard from "@/component/profile/OrderHistoryItemCard";

export default function OrderHistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("completed"); // "completed" | "canceled"

  const { orderHistory = { completedOrders: [], canceledOrders: [] } } = data;

  const currentOrders =
    activeTab === "completed"
      ? orderHistory.completedOrders || []
      : orderHistory.canceledOrders || [];

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden font-sans">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-[#f7f8fa] min-h-screen shadow-sm flex flex-col overflow-hidden relative pb-8">
        {/* Header Bar */}
        <header className="w-full px-5 py-4 bg-white border-b border-[#eff1f0] flex items-center gap-3 shrink-0 z-40">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <Image
              src="/restaurant/back.svg"
              alt="Back"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </button>
          <h1 className="text-lg font-bold text-[#03130a]">Order History</h1>
        </header>

        <div className="w-full bg-white border-b border-[#E0E3E1] flex items-center shrink-0 z-30">
          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-all cursor-pointer border-b-2 ${
              activeTab === "completed"
                ? "border-[#FF3333] text-[#03130A]"
                : "border-transparent text-[#6B7971]"
            }`}
          >
            Completed Orders
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("canceled")}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-all cursor-pointer border-b-2 ${
              activeTab === "canceled"
                ? "border-[#FF3333] text-[#03130A]"
                : "border-transparent text-[#6B7971]"
            }`}
          >
            Canceled Orders
          </button>
        </div>

        <main className="flex-1 px-5 pt-4 pb-12 flex flex-col gap-4 overflow-y-auto">
          <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-3 shadow-[0px_0px_4px_rgba(0,0,0,0.08),4px_4px_8px_rgba(0,0,0,0.16)] border border-[#E0E3E1]">
            <div className="flex items-start gap-3 w-full">
              <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 opacity-70">
                <Image
                  src="/profile/history.svg"
                  alt="History"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <h2 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
                  Order History
                </h2>
                <p className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
                  View your recently delivered orders
                </p>
              </div>
            </div>

            <div className="w-full border-t border-[#E0E3E1]" />

            <div className="flex flex-col gap-3 pt-1">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <OrderHistoryItemCard key={order.id} order={order} />
                ))
              ) : (
                <div className="py-8 text-center text-sm font-medium text-[#6B7971] italic">
                  No {activeTab} orders found.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}