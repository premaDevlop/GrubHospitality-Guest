"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";

import HomeHeader from "@/component/Home/HomeHeader";
import HomeSearchBar from "@/component/Home/HomeSearchBar";
import RestaurantCard from "@/component/Home/RestaurantCard";

export default function RestaurantListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { restaurants } = data;

  // Filter
  const filteredRestaurants = restaurants.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-white h-screen shadow-sm flex flex-col overflow-hidden relative">
        <HomeHeader />

        <div className="shrink-0 px-5 pt-4 pb-3 flex flex-col gap-4 bg-white border-b border-[#eff1f0]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/home")}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
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
            <h1 className="text-lg font-semibold text-[#03130a]">Restaurants</h1>
          </div>

          <HomeSearchBar
            placeholder="Search Restaurant"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Restaurant Listing - scrollable area */}
        <div className="bg-[#f7f8fa] flex-1 px-5 py-4 flex flex-col gap-4 overflow-y-auto pb-16">
          <div className="flex flex-col gap-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div className="text-center py-12 text-sm text-[#6b7971]">
                No restaurants found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
