"use client";

import BackButton from "@/component/kitchen/BackButton";
import RestaurantCard from "@/component/kitchen/RestaurantCard";
import Divider from "@/component/kitchen/Divider";
import SearchBar from "@/component/kitchen/SearchBar";
import FilterButtons from "@/component/kitchen/FilterButtons";

const restaurantData = {
  name: "The Saffron Room",
  cuisines: ["INDIAN", "CHINESE", "FINE DINE"],
  timing: "11 AM - 11 PM",
  description:
    "Authentic royal Awadhi cuisine served in an opulent setting reflecting the grandeur of Nawabi culture.",
  isOpen: true,
  image: "/kitchen/kitch.jpg",
};

export default function KitchenPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <BackButton />

      <div className="w-full">
        <RestaurantCard
          image={restaurantData.image}
          name={restaurantData.name}
          cuisines={restaurantData.cuisines}
          timing={restaurantData.timing}
          description={restaurantData.description}
          isOpen={restaurantData.isOpen}
        />
      </div>

      <Divider />

      <div className="flex flex-col gap-[12px]">
        <SearchBar />
        <FilterButtons />
      </div>
    </main>
  );
}
