"use client";

import { useState, useEffect } from "react";
import data from "../../data/data.json";


import HomeHeroBanner from "@/component/Home/HomeHeroBanner";
import HomeSearchBar from "@/component/Home/HomeSearchBar";
import HomeScheduleBanner from "@/component/Home/HomeScheduleBanner";
import RestaurantListSection from "@/component/Home/RestaurantListSection";
import HomeSkeleton from "@/component/Home/HomeSkeleton";
import { useRoom } from "@/component/providers/RoomProvider";
import OrderStatusPanel from "@/component/ui/OrderStatusPanel";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, restaurants } = data;
  const { selectedRoom } = useRoom();

  const userWithRoom = {
    ...user,
    room: selectedRoom || user.room,
  };

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

        <main className="flex-1 px-5 pt-4 flex flex-col gap-5 bg-[#f7f8fa] mt-2">
          <HomeHeroBanner user={userWithRoom} />
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
        <OrderStatusPanel />
      </div>
    </div>
  );
}
