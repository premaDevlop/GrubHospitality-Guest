"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";

import HomeHeader from "@/component/home/HomeHeader";
import SearchInputBar from "@/component/search/SearchInputBar";
import SearchTabs from "@/component/search/SearchTabs";
import SearchFilterBar from "@/component/search/SearchFilterBar";
import DishCard from "@/component/search/DishCard";
import RestaurantDishGroupCard from "@/component/search/RestaurantDishGroupCard";
import SortByModal from "@/component/search/SortByModal";
import FilterModal from "@/component/search/FilterModal";
import DishDetailModal from "@/component/search/DishDetailModal";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get("q") || "Biryani" : "Biryani";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("dishes"); // "dishes" | "restaurant"
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [isRated4Plus, setIsRated4Plus] = useState(false);
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  // Modal states
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDishModal, setActiveDishModal] = useState(null);

  const { dishes = [], restaurants = [] } = data;

  // Filter Dishes
  const filteredDishes = useMemo(() => {
    let result = dishes.filter((dish) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.kitchenName.toLowerCase().includes(q) ||
        dish.cuisine.toLowerCase().includes(q);
      const matchesVeg = !isVegOnly || dish.isVeg === true;
      const matchesRating = !isRated4Plus || (dish.rating && dish.rating >= 4.0);
      const matchesCuisine =
        selectedCuisines.length === 0 || selectedCuisines.includes(dish.cuisine);

      return matchesQuery && matchesVeg && matchesRating && matchesCuisine;
    });

    // Sorting logic
    if (selectedSort === "price_low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price_high_low") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating_high_low") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (selectedSort === "rating_low_high") {
      result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    return result;
  }, [dishes, query, isVegOnly, isRated4Plus, selectedCuisines, selectedSort]);

  // Filter Restaurants & group dishes by restaurant
  const restaurantGroups = useMemo(() => {
    return restaurants
      .map((rest) => {
        const restDishes = filteredDishes.filter(
          (d) => d.restaurantId === rest.id || d.kitchenName.toLowerCase().includes(rest.name.toLowerCase())
        );
        return {
          restaurant: rest,
          dishes: restDishes.length > 0 ? restDishes : filteredDishes.slice(0, 3),
        };
      })
      .filter((group) => {
        const q = query.toLowerCase();
        if (!q) return true;
        return (
          group.restaurant.name.toLowerCase().includes(q) ||
          group.restaurant.cuisine.toLowerCase().includes(q) ||
          group.dishes.length > 0
        );
      });
  }, [restaurants, filteredDishes, query]);

  return (
    <div className="w-full h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-white h-screen shadow-sm flex flex-col overflow-hidden relative">
        <HomeHeader />

        <main className="flex-1 px-5 pt-3 pb-16 flex flex-col gap-4 overflow-y-auto">
          {/* Results Sub Header */}
          <div className="flex items-center gap-3 py-1 shrink-0">
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
            <h1 className="text-lg font-bold text-[#03130a]">
              Results for &ldquo;{query || "Biryani"}&rdquo;
            </h1>
          </div>

          {/*  Veg Toggle  */}
          <SearchInputBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            isVegOnly={isVegOnly}
            onToggleVeg={() => setIsVegOnly(!isVegOnly)}
            placeholder="Search dish or kitchen"
          />

          {/* Active Tabs */}
          <SearchTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Filter & Sort Action */}
          <SearchFilterBar
            onOpenFilter={() => setIsFilterOpen(true)}
            onOpenSort={() => setIsSortOpen(true)}
            isRated4Plus={isRated4Plus}
            onToggleRated4Plus={() => setIsRated4Plus(!isRated4Plus)}
          />

          {/* Tab Content List */}
          <div className="flex flex-col gap-4 mt-1">
            {activeTab === "dishes" ? (
              filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onSelectDish={(item) => setActiveDishModal(item)}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-sm text-[#6b7971]">
                  No dishes found matching &ldquo;{query}&rdquo;
                </div>
              )
            ) : restaurantGroups.length > 0 ? (
              restaurantGroups.map((group) => (
                <RestaurantDishGroupCard
                  key={group.restaurant.id}
                  restaurant={group.restaurant}
                  dishes={group.dishes}
                  onSelectDish={(item) => setActiveDishModal(item)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-sm text-[#6b7971]">
                No restaurants found matching &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </main>

        {/* Modals */}
        <SortByModal
          isOpen={isSortOpen}
          onClose={() => setIsSortOpen(false)}
          selectedSort={selectedSort}
          onApplySort={(sortId) => setSelectedSort(sortId)}
        />

        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedCuisines={selectedCuisines}
          onApplyFilters={(cuisines) => setSelectedCuisines(cuisines)}
        />

        <DishDetailModal
          isOpen={Boolean(activeDishModal)}
          dish={activeDishModal}
          onClose={() => setActiveDishModal(null)}
        />
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
