"use client";

export default function SearchTabs({ activeTab, onSelectTab }) {
  return (
    <div className="flex items-center gap-8 border-b border-[#eff1f0] w-full pt-1 shrink-0">
      <button
        type="button"
        onClick={() => onSelectTab("dishes")}
        className={`pb-2.5 text-base font-bold transition-all relative cursor-pointer ${
          activeTab === "dishes"
            ? "text-[#03130a]"
            : "text-[#6b7971] hover:text-[#03130a]"
        }`}
      >
        Dishes
        {activeTab === "dishes" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fe480b] rounded-full" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("restaurant")}
        className={`pb-2.5 text-base font-bold transition-all relative cursor-pointer ${
          activeTab === "restaurant"
            ? "text-[#03130a]"
            : "text-[#6b7971] hover:text-[#03130a]"
        }`}
      >
        Restaurant
        {activeTab === "restaurant" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fe480b] rounded-full" />
        )}
      </button>
    </div>
  );
}
