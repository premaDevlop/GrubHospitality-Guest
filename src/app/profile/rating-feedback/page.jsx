"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";

import RatingFeedbackOrderCard from "@/component/profile/RatingFeedbackOrderCard";
import ShareExperienceCard from "@/component/profile/ShareExperienceCard";
import BillSummaryCard from "@/component/profile/BillSummaryCard";

export default function RatingFeedbackPage() {
  const router = useRouter();

  const sampleOrder = data.orderHistory?.completedOrders?.[0] || {
    restaurantName: "House Of Ming",
    time: "13 June’ 26, 17:09",
    status: "Delivered",
    items: [
      { id: "1", name: "Hyderabadi Biryani", qty: 1, isVeg: true },
      { id: "2", name: "Muradabadi Biryani", qty: 1, isVeg: true }
    ],
    totalAmount: 1240
  };

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden font-sans">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-[#f7f8fa] min-h-screen shadow-sm flex flex-col overflow-hidden relative pb-8">
=        <header className="w-full px-5 py-4 bg-white border-b border-[#eff1f0] flex items-center gap-3 shrink-0 z-40">
          <button
            type="button"
            onClick={() => router.back()}
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
          <h1 className="text-lg font-bold text-[#03130a]">Rating & Feedback</h1>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 px-4 sm:px-5 pt-4 pb-12 flex flex-col gap-4 overflow-y-auto">
          {/* Order Summary Card */}
          <RatingFeedbackOrderCard order={sampleOrder} />

          {/*  Rating & Feedback Card */}
          <ShareExperienceCard order={sampleOrder} />

          {/* Bill Summary Card */}
          <BillSummaryCard amount={1500} />

          {/* Bottom Reorder Button */}
          <div className="w-full pt-2 pb-4">
            <button
              type="button"
              onClick={() => router.push("/home/search-result")}
              className="w-full h-[48px] bg-[#FF4848] border border-[#FF3333] text-white rounded-lg text-[18px] leading-[24px] font-medium uppercase tracking-normal cursor-pointer shadow-xs active:bg-[#e03d06] transition-colors"
            >
              reorder
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}