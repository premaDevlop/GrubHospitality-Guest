"use client";

import { useState, useEffect } from "react";
import data from "../../data/data.json";

import HomeHeader from "@/component/home/HomeHeader";
import HomeHeroBanner from "@/component/home/HomeHeroBanner";
import HomeSearchBar from "@/component/home/HomeSearchBar";
import HomeScheduleBanner from "@/component/home/HomeScheduleBanner";
import RestaurantListSection from "@/component/home/RestaurantListSection";
import HomeSkeleton from "@/component/home/HomeSkeleton";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, restaurants } = data;

  useEffect(() => {
    //  data loading 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // search filter
  const filteredRestaurants = restaurants.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col  items-center select-none">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen   shadow-sm flex flex-col pb-12">
        <HomeHeader />
        <main className="flex-1 px-5 pt-4 flex flex-col gap-5 bg-[#f7f8fa] mt-2">
          <HomeHeroBanner user={user} />
          <HomeSearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HomeScheduleBanner />
          <RestaurantListSection
            restaurants={filteredRestaurants}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}
