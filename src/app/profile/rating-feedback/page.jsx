"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";

import RatingFeedbackOrderCard from "@/component/profile/RatingFeedbackOrderCard";
import ShareExperienceCard from "@/component/profile/ShareExperienceCard";
import BillSummaryCard from "@/component/profile/BillSummaryCard";

function RatingFeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const shareExperienceRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const sampleOrder = data.orderHistory?.completedOrders?.find((o) => o.id === orderId)
    || data.orderHistory?.completedOrders?.[0]
    || {
      restaurantName: "House Of Ming",
      time: "13 June' 26, 17:09",
      status: "Delivered",
      items: [],
      totalAmount: 0,
    };

  useEffect(() => {
    if (orderId) {
      const saved = localStorage.getItem(`feedback_${orderId}`);
      if (saved) setSubmitted(true);
    }
  }, [orderId]);

  const handleSubmit = () => {
    if (shareExperienceRef.current && !shareExperienceRef.current.submitted) {
      shareExperienceRef.current.handleSubmit();
      if (orderId) {
        localStorage.setItem(`feedback_${orderId}`, JSON.stringify({
          overallRating: 5,
          feedback: "Great food!",
          time: new Date().toISOString(),
        }));
      }
      setSubmitted(true);
    }
  };

  if (submitted) {
    const saved = orderId ? JSON.parse(localStorage.getItem(`feedback_${orderId}`) || "{}") : {};
    return (
      <div className="w-full h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden font-sans">
        <div className="w-full max-w-[480px] sm:max-w-[768px] bg-[#f7f8fa] h-screen shadow-sm flex flex-col overflow-hidden relative pb-8">
          <header className="w-full px-5 py-4 bg-white border-b border-[#eff1f0] flex items-center gap-3 shrink-0 z-40">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <Image src="/restaurant/back.svg" alt="Back" width={20} height={20} className="w-5 h-5 object-contain" />
            </button>
            <h1 className="text-lg font-bold text-[#03130a]">Your Feedback</h1>
          </header>

          <main className="flex-1 px-4 sm:px-5 pt-4 pb-12 flex flex-col gap-4 overflow-y-auto">
            <RatingFeedbackOrderCard order={sampleOrder} />

            <div className="w-full bg-white rounded-lg p-4 shadow-2xs border border-[#E0E3E1] flex flex-col gap-3">
              <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">Your Rating</h3>
              <div className="w-full border-t border-[#E0E3E1]" />
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src={star <= (saved.overallRating || 5) ? "/profile/star_filled.svg" : "/profile/star_outline.svg"}
                    alt={`Star ${star}`}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                ))}
              </div>
              <div className="w-full border-t border-[#E0E3E1]" />
              <div className="flex flex-col gap-1">
                <span className="text-[14px] leading-[20px] font-semibold text-[#37493F]">Feedback</span>
                <p className="text-[14px] leading-[20px] text-[#6B7971]">{saved.feedback || "Great food!"}</p>
              </div>
            </div>

            <BillSummaryCard amount={sampleOrder.totalAmount || 0} />

            <div className="w-full pt-2 pb-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full h-[48px] bg-[#FF4848] border border-[#FF3333] text-white rounded-lg text-[18px] leading-[24px] font-medium uppercase tracking-normal cursor-pointer shadow-xs active:bg-[#e03d06] transition-colors"
              >
                done
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden font-sans">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-[#f7f8fa] h-screen shadow-sm flex flex-col overflow-hidden relative pb-8">
        <header className="w-full px-5 py-4 bg-white border-b border-[#eff1f0] flex items-center gap-3 shrink-0 z-40">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <Image src="/restaurant/back.svg" alt="Back" width={20} height={20} className="w-5 h-5 object-contain" />
          </button>
          <h1 className="text-lg font-bold text-[#03130a]">Rating & Feedback</h1>
        </header>

        <main className="flex-1 px-4 sm:px-5 pt-4 pb-12 flex flex-col gap-4 overflow-y-auto">
          <RatingFeedbackOrderCard order={sampleOrder} />
          <ShareExperienceCard ref={shareExperienceRef} order={sampleOrder} />
          <BillSummaryCard amount={sampleOrder.totalAmount || 0} />

          <div className="w-full pt-2 pb-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full h-[48px] bg-[#FF4848] border border-[#FF3333] text-white rounded-lg text-[18px] leading-[24px] font-medium uppercase tracking-normal cursor-pointer shadow-xs active:bg-[#e03d06] transition-colors"
            >
              submit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RatingFeedbackPage() {
  return (
    <Suspense fallback={null}>
      <RatingFeedbackContent />
    </Suspense>
  );
}
