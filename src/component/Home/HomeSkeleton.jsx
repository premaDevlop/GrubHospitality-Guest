"use client";

export default function HomeSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-white min-h-screen shadow-sm flex flex-col pb-8">
        {/* Header Skeleton */}
        <div className="w-full px-5 py-4 flex items-center justify-between border-b border-[#eff1f0]">
          <div className="h-8 w-32 bg-[#EFF1F0] rounded-lg animate-pulse" />
          <div className="w-10 h-10 bg-[#EFF1F0] rounded-full animate-pulse" />
        </div>

        <div className="flex-1 px-5 pt-4 flex flex-col gap-5">
          {/* Hero Banner Skeleton */}
          <div className="w-full h-[260px] sm:h-[300px] bg-[#EFF1F0] rounded-2xl animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="w-full h-12 bg-[#EFF1F0] rounded-xl animate-pulse" />

          {/* Schedule Banner Skeleton */}
          <div className="w-full h-20 bg-[#EFF1F0] rounded-2xl animate-pulse" />

          {/* Section Header Skeleton */}
          <div className="flex items-center justify-between mt-1">
            <div className="h-6 w-36 bg-[#EFF1F0] rounded-lg animate-pulse" />
            <div className="h-4 w-16 bg-[#EFF1F0] rounded-lg animate-pulse" />
          </div>

          {/* Restaurant Cards Skeleton */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="w-full bg-[#EFF1F0] rounded-2xl h-[320px] sm:h-[380px] animate-pulse overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
