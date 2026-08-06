"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";

import HomeHeader from "@/component/home/HomeHeader";
import HomeSearchBar from "@/component/home/HomeSearchBar";
import RestaurantCard from "@/component/home/RestaurantCard";

export default function RestaurantListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { restaurants } = data;

  // Filter 
  const filteredRestaurants = restaurants.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-y-auto">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-white min-h-screen shadow-sm flex flex-col pb-16">
        
        <HomeHeader />

        <main className="flex-1 px-5 pt-4 flex flex-col gap-4 overflow-y-auto">
          {/* Sub Header: Back Button & Title */}
          <div className="flex items-center gap-3 py-1">
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
            <h1 className="text-lg font-bold text-[#03130a]">See More</h1>
          </div>

          {/* Reusing Existing HomeSearchBar */}
          <HomeSearchBar
            placeholder="Search Restaurant"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Restaurant Listing */}
          <div className="flex flex-col gap-4 mt-1">
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
        </main>
      </div>
    </div>
  );
}