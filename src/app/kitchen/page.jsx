"use client";

import { useState } from "react";
import BackButton from "@/component/kitchen/BackButton";
import RestaurantCard from "@/component/kitchen/RestaurantCard";
import Divider from "@/component/kitchen/Divider";
import SearchBar from "@/component/kitchen/SearchBar";
import FilterButtons from "@/component/kitchen/FilterButtons";
import MenuList from "@/component/kitchen/MenuList";
import MenuDetailModal from "@/component/kitchen/MenuDetailModal";
import mockMenuData from "@/data/mock-menu.json";

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
  const [activeCategory, setActiveCategory] = useState(
    mockMenuData.categories[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    document
      .getElementById(`category-${categoryId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="w-full min-h-screen bg-[#F7F8FA]">
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
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterButtons />
      </div>

      <div className="w-full px-[var(--gp-page-padding-x-regular)] pt-[var(--gp-page-padding-y-regular)] pb-[var(--gp-page-padding-y-regular)]">
        <MenuList
          menuData={mockMenuData.menu}
          categories={mockMenuData.categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onMenuItemClick={setSelectedItem}
        />
      </div>

      {selectedItem && (
        <MenuDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </main>
  );
}