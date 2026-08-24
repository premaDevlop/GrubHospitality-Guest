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

  // Order success banner — reads params from URL
  const [showOrderBanner, setShowOrderBanner] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState(null); // { time, day, month }
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("orderPlaced") === "true") {
        setShowOrderBanner(true);
        const scheduled = urlParams.get("scheduled") === "true";
        setIsScheduled(scheduled);
        if (scheduled) {
          setScheduleInfo({
            time: urlParams.get("time") || "12:30",
            day: urlParams.get("day") || "",
            month: urlParams.get("month") || "",
          });
        }
        // Clean up URL
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (showOrderBanner && isBannerExpanded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showOrderBanner, isBannerExpanded]);

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

      {/* Order Status Bottom Panel — matches schedule modal styling */}
      {showOrderBanner && (
        <OrderStatusBottomPanel
          isExpanded={isBannerExpanded}
          onToggle={() => setIsBannerExpanded((v) => !v)}
          isScheduled={isScheduled}
          scheduleInfo={scheduleInfo}
        />
      )}

      {/* Cart Checkout Bar — only shows when no order banner */}
      {!showOrderBanner && <CartCheckoutBar />}
    </main>
  );
}

// ---- Order Status Bottom Panel ----
function OrderStatusBottomPanel({ isExpanded, onToggle, isScheduled, scheduleInfo }) {
  const steps = isScheduled
    ? calculateScheduledSteps(scheduleInfo?.time)
    : calculateInstantOrderSteps();

  const primaryMessage = isScheduled
    ? "Your order has been scheduled."
    : "We've successfully received your order.";

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1.5px]"
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
          isExpanded
            ? "w-full px-0 pb-0 pt-0"
            : "w-full max-w-[480px] sm:max-w-[768px] px-4 pb-4 pt-0"
        }`}
      >
        {isExpanded && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-[#e0e3e1] shadow-md flex items-center justify-center cursor-pointer hover:bg-[#f7f8fa] transition-colors z-10 pointer-events-auto"
            aria-label="Close order status panel"
            id="order-status-close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#03130a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <div
          className={`bg-white border border-[#e0e3e1] shadow-[0_-4px_24px_rgba(0,0,0,0.12)] pointer-events-auto overflow-hidden transition-all duration-300 ${
            isExpanded ? "rounded-none" : "rounded-xl"
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
            id="order-status-banner"
            aria-expanded={isExpanded}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#6b7971" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="9" y="3" width="6" height="4" rx="1" stroke="#6b7971" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-bold text-[#03130a]">Order Status</span>
              </div>
              <p className="text-xs text-[#6b7971] mt-0.5 pl-[26px]">
                {primaryMessage}
              </p>
            </div>

            {!isExpanded && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 shrink-0 rotate-180"
              >
                <path d="M6 9L12 15L18 9" stroke="#6b7971" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 pt-1 border-t border-[#f0f0f0]">
              <div className="flex flex-col gap-0">
                {steps.map((step, idx) => (
                  <TimelineStep
                    key={step.id}
                    icon={step.icon}
                    title={step.title}
                    subtitle={step.subtitle}
                    isFirst={idx === 0}
                    isLast={idx === steps.length - 1}
                    isDone={step.done}
                    timestamp={step.timestamp}
                  />
                ))}
              </div>
              <button
                type="button"
                className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-widest text-[#03130a] cursor-pointer hover:opacity-70 transition-opacity"
                id="view-order-details-btn"
              >
                VIEW DETAILS
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function TimelineStep({ icon, title, subtitle, isFirst, isLast, isDone, timestamp }) {
  return (
    <div className="flex items-start gap-3">
      {/* Icon + vertical line column */}
      <div className="flex flex-col items-center" style={{ minWidth: 32 }}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${
            isDone
              ? "border-green-500 bg-white"
              : "border-[#e0e3e1] bg-white"
          }`}
        >
          {isDone ? (
            // Green checkmark
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            // step-specific icon passed in
            icon
          )}
        </div>
        {/* Vertical connector line — hidden for last step */}
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 mb-1"
            style={{
              minHeight: 28,
              background: isDone ? "#22c55e" : "#e0e3e1",
            }}
          />
        )}
      </div>

      {/* Text column */}
      <div className="flex-1 pb-3">
        <div className="flex items-baseline justify-between">
          <span
            className={`text-sm font-semibold ${
              isDone ? "text-[#03130a]" : "text-[#6b7971]"
            }`}
          >
            {title}
          </span>
          {isFirst && timestamp && (
            <span className="text-xs text-[#6b7971] font-medium">{timestamp}</span>
          )}
        </div>
        <p className="text-xs text-[#9ca8a2] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function calculateInstantOrderSteps() {
  const now = new Date();
  const timestamp = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return [
    {
      id: "accepted",
      title: "Order Accepted",
      subtitle: "Done",
      icon: <CheckIcon />,
      done: true,
      timestamp,
    },
    {
      id: "prepared",
      title: "Order Prepared",
      subtitle: "In Process...",
      icon: <PrepIcon />,
      done: false,
    },
    {
      id: "ready",
      title: "Order Ready",
      subtitle: "Est. 15 Minutes",
      icon: <ReadyIcon />,
      done: false,
    },
    {
      id: "delivered",
      title: "Order Delivered",
      subtitle: "Est. 15 Minutes",
      icon: <DeliverIcon />,
      done: false,
    },
  ];
}

function calculateScheduledSteps(deliveryTime) {
  // deliveryTime is "HH:MM" string e.g. "12:30"
  const parseTime = (t) => {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    return { h, m };
  };

  const addMinutes = (h, m, mins) => {
    const total = h * 60 + m + mins;
    return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  };

  const fmt = (t) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const parsed = parseTime(deliveryTime);

  // If no time provided, use relative labels only
  const acceptTime = parsed ? addMinutes(parsed.h, parsed.m, -120) : null; // 2 hrs before delivery
  const prepTime = parsed ? addMinutes(parsed.h, parsed.m, -15) : null;    // 15 min before delivery
  const deliveredTime = deliveryTime;                                        // the scheduled delivery time
  const readyTime = parsed ? addMinutes(parsed.h, parsed.m, -15) : null;

  return [
    {
      id: "accept",
      title: "Will be Accepted",
      subtitle: acceptTime
        ? `By ${fmt(acceptTime)} (2 hours before delivery)`
        : "2 hours before delivery",
      icon: <CheckIcon />,
    },
    {
      id: "prepared",
      title: "Order Prepared",
      subtitle: prepTime ? `Will start at ${fmt(prepTime)}` : "Before your delivery time",
      icon: <PrepIcon />,
    },
    {
      id: "ready",
      title: "Order Ready",
      subtitle: "Est. 15 Minutes",
      icon: <ReadyIcon />,
    },
    {
      id: "delivered",
      title: "Order Delivered",
      subtitle: "Est. 15 Minutes",
      icon: <DeliverIcon />,
    },
  ];
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="#9ca8a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PrepIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4v6l4 2" stroke="#9ca8a2" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ReadyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" fill="#9ca8a2" />
    </svg>
  );
}
function DeliverIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="#9ca8a2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}