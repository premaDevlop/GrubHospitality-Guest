"use client";

import { useRouter } from "next/navigation";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantListSection({
  restaurants,
  searchQuery,
  limit,
}) {
  const router = useRouter();

  const displayedRestaurants = limit
    ? restaurants.slice(0, limit)
    : restaurants;

  return (
    <section className="flex flex-col gap-4 mt-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#03130a]">Our Restaurants</h2>
        <button
          type="button"
          onClick={() => router.push("/home/restaurant-list")}
          className="text-xs font-semibold text-[#6b7971] uppercase tracking-wider transition-colors cursor-pointer"
        >
          see more
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="flex flex-col gap-4">
        {displayedRestaurants.length > 0 ? (
          displayedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div className="text-center py-8 text-sm text-[#6b7971]">
            No restaurants found matching "{searchQuery}"
          </div>
        )}
      </div>
    </section>
  );
}
