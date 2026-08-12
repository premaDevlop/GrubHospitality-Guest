"use client";

import { useState } from "react";
import Image from "next/image";

export default function ShareExperienceCard({ order }) {
  const [overallRating, setOverallRating] = useState(0);
  const [itemRatings, setItemRatings] = useState({});
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const items = order?.items || [
    { id: "i1", name: "Hyderabadi Biryani" },
    { id: "i2", name: "Muradabadi Biryani" }
  ];

  const handleItemRating = (id, rating) => {
    setItemRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (feedback.trim() || overallRating > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-2xs border border-[#E0E3E1] flex flex-col gap-3">
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-[18px] leading-[28px] font-semibold text-[#03130A]">
          Share Your Experience
        </h3>
        <p className="text-[14px] leading-[20px] font-normal italic text-[#6B7971]">
          Share your feedback on the food quality.
        </p>
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      <div className="flex flex-col gap-2">
        <span className="text-[14px] leading-[20px] font-normal text-[#37493F]">
          Rate Your Overall Order
        </span>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setOverallRating(star)}
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <Image
                src={star <= overallRating ? "/profile/star_filled.svg" : "/profile/star_outline.svg"}
                alt={`Star ${star}`}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-[#E0E3E1]" />

      {items.map((item, idx) => {
        const itemId = item.id || `dish-${idx}`;
        const rating = itemRatings[itemId] || 0;
        return (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[14px] leading-[20px] font-normal text-[#37493F]">
              {item.name}
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleItemRating(itemId, star)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Image
                    src={star <= rating ? "/profile/star_filled.svg" : "/profile/star_outline.svg"}
                    alt={`Star ${star}`}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="w-full border-t border-[#E0E3E1]" />

      <div className="flex flex-col gap-2 w-full">
        <label className="text-[14px] leading-[20px] font-semibold text-[#37493F]">
          Drop a feedback
        </label>
        <div className="relative w-full">
          <textarea
            rows={3}
            placeholder="Loved the meal..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={submitted}
            className="w-full p-3 pr-12 bg-white border border-[#E0E3E1] rounded-lg text-xs font-normal text-[#37493F] placeholder:text-[#6B7971] outline-none resize-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitted}
            className="absolute right-3 bottom-4 w-7 h-7 bg-[#FF4848] border border-[#FF3333] rounded-lg flex items-center justify-center cursor-pointer shadow-xs active:bg-[#e03d06] transition-colors"
          >
            <Image
              src="/profile/arrow_right_white.svg"
              alt="Submit"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
          </button>
        </div>
        {submitted && (
          <span className="text-xs text-[#479F29] font-medium pt-1">
            Thank you! Your feedback has been recorded.
          </span>
        )}
      </div>
    </div>
  );
}
