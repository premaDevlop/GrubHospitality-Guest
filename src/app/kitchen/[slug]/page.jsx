"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BackButton from "@/component/kitchen/BackButton";
import RestaurantCard from "@/component/kitchen/RestaurantCard";
import Divider from "@/component/kitchen/Divider";
import SearchBar from "@/component/kitchen/SearchBar";
import FilterButtons from "@/component/kitchen/FilterButtons";
import FilterModal, {
  DIETARY_OPTIONS,
  PRICE_OPTIONS,
  CUISINE_OPTIONS,
  getPriceRange,
} from "@/component/search/FilterModal";
import SortByModal from "@/component/search/SortByModal";
import MenuList from "@/component/kitchen/MenuList";
import MenuDetailModal from "@/component/kitchen/MenuDetailModal";
import CartCheckoutBar from "@/component/ui/CartCheckoutBar";
import data from "@/data/data.json";
import { useCart } from "@/component/providers/CartProvider";

export default function KitchenPage() {
  const params = useParams();
  const slug = params?.slug;
  const { addToCart, itemCount } = useCart();

  // Order success banner
  const [showOrderBanner, setShowOrderBanner] = useState(false);
  const [isBannerExpanded, setIsBannerExpanded] = useState(true);

  // Show banner when returning with ?placed=true — we use a simple effect
  // (useSearchParams needs Suspense; we use window.location for simplicity here)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("orderPlaced") === "true") {
        setShowOrderBanner(true);
        // Clean up URL
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  const restaurant = useMemo(
    () => data.restaurants.find((r) => r.slug === slug) || null,
    [slug],
  );

  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter & sort state (shared styling with search pages)
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const categories = useMemo(
    () =>
      restaurant?.menu?.map((cat) => ({
        id: cat.id,
        name: cat.name,
        count: cat.items?.length || 0,
      })) || [],
    [restaurant],
  );

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    document
      .getElementById(`category-${categoryId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = (item) => {
    addToCart(
      {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
      },
      item,
    );
  };

  const filteredMenu = useMemo(() => {
    if (!restaurant) return [];

    let menu = restaurant.menu;

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      menu = menu
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.name.toLowerCase().includes(q) ||
              (item.description || "").toLowerCase().includes(q),
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    // Dietary filter
    if (selectedDietary.length > 0) {
      const wantVeg = selectedDietary.includes("Veg");
      const wantNonVeg = selectedDietary.includes("Non-Veg");
      menu = menu
        .map((cat) => ({
          ...cat,
          items:
            wantVeg && wantNonVeg
              ? cat.items
              : cat.items.filter((item) =>
                  wantVeg ? item.isVeg === true : item.isVeg === false,
                ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    // Price filter
    if (selectedPrices.length > 0) {
      menu = menu
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            selectedPrices.some((label) => {
              const range = getPriceRange(label);
              return (
                range && item.price >= range.min && item.price <= range.max
              );
            }),
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    // Cuisine filter (matches item name/description for menu items)
    if (selectedCuisines.length > 0) {
      menu = menu
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) => {
            const text = `${item.name} ${item.description || ""}`.toLowerCase();
            return selectedCuisines.some((c) => text.includes(c.toLowerCase()));
          }),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    // Sort each category's items
    menu = menu.map((cat) => {
      const sorted = [...cat.items];
      if (selectedSort === "price_low_high") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (selectedSort === "price_high_low") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (selectedSort === "rating_high_low") {
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (selectedSort === "rating_low_high") {
        sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      }
      return { ...cat, items: sorted };
    });

    return menu;
  }, [
    restaurant,
    searchQuery,
    selectedDietary,
    selectedPrices,
    selectedCuisines,
    selectedSort,
  ]);

  if (!restaurant) {
    return (
      <main className="w-full min-h-screen bg-[#F7F8FA] flex flex-col">
        <BackButton />
        <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-center">
          <p className="text-[18px] font-medium text-[var(--gp-color-text-neutral-primary)]">
            Restaurant not found
          </p>
          <a
            href="/home"
            className="text-[16px] font-semibold text-[var(--gp-color-brand-primary)]"
          >
            Back to restaurants
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F7F8FA]" style={{ paddingBottom: itemCount > 0 ? "80px" : "0" }}>
      <BackButton />

      <div className="w-full">
        <RestaurantCard
          image={restaurant.image}
          name={restaurant.name}
          cuisines={restaurant.cuisine.split(" · ")}
          timing={restaurant.timing}
          description={restaurant.description}
          isOpen={restaurant.timing.toLowerCase().includes("open")}
        />
      </div>

      <Divider />

      <div className="flex flex-col gap-[12px]">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterButtons
          onOpenFilter={() => setIsFilterOpen(true)}
          onOpenSort={() => setIsSortOpen(true)}
          selectedDietary={selectedDietary}
          onToggleDietary={(value) =>
            setSelectedDietary((prev) =>
              prev.includes(value)
                ? prev.filter((d) => d !== value)
                : [...prev, value],
            )
          }
        />
      </div>

      <div className="w-full px-[var(--gp-page-padding-x-regular)] pt-[var(--gp-page-padding-y-regular)] pb-[var(--gp-page-padding-y-regular)]">
        <MenuList
          restaurant={restaurant}
          menuData={filteredMenu}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onMenuItemClick={setSelectedItem}
          onAddItem={handleAdd}
        />
      </div>

      <SortByModal
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={selectedSort}
        onApplySort={setSelectedSort}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sections={[
          { id: "PRICE", label: "PRICE", options: PRICE_OPTIONS },
          { id: "DIETARY", label: "DIETARY", options: DIETARY_OPTIONS },
          { id: "CUISINES", label: "CUISINES", options: CUISINE_OPTIONS },
        ]}
        selections={{
          PRICE: selectedPrices,
          DIETARY: selectedDietary,
          CUISINES: selectedCuisines,
        }}
        onApplyFilters={(selections) => {
          setSelectedPrices(selections.PRICE || []);
          setSelectedDietary(selections.DIETARY || []);
          setSelectedCuisines(selections.CUISINES || []);
        }}
      />

      {selectedItem && (
        <MenuDetailModal
          item={selectedItem}
          restaurant={restaurant}
          onClose={() => setSelectedItem(null)}
          onAdd={() => handleAdd(selectedItem)}
        />
      )}

      {/* Order Success Status Bar */}
      {showOrderBanner && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[768px] bg-white border-t border-[#e0e3e1] z-50 shadow-lg">
          <button
            type="button"
            onClick={() => setIsBannerExpanded((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
            id="order-status-banner"
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#6b7971" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="#6b7971" strokeWidth="1.5" />
              </svg>
              <span className="text-sm font-bold text-[#03130a]">Order Status</span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform ${isBannerExpanded ? "rotate-180" : "rotate-0"}`}
            >
              <path d="M6 9L12 15L18 9" stroke="#6b7971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isBannerExpanded && (
            <div className="px-4 pb-4">
              <p className="text-sm text-[#6b7971]">
                We&apos;ve successfully{" "}
                <span className="text-green-600 font-semibold">received</span>{" "}
                your order.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Cart Checkout Bar — only shows when no order banner */}
      {!showOrderBanner && <CartCheckoutBar />}
    </main>
  );
}
