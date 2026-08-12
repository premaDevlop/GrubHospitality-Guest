"use client";

import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

function CartToast({ name }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#e0e3e1] rounded-xl shadow-lg px-4 py-3">
      <div className="w-2.5 h-2.5 rounded-full bg-[#fe480b]" />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#03130a]">
          {name} added to cart
        </span>
        <span className="text-xs text-[#6b7971]">
          Go to cart to review and place your order
        </span>
      </div>
    </div>
  );
}

export function CartProvider({ children }) {
  // items: [{ restaurant, item, qty }] where restaurant = { id, name, slug }
  const [items, setItems] = useState([]);

  const addToCart = (restaurant, item) => {
    if (!restaurant || !item) return;
    setItems((prev) => {
      const existing = prev.find(
        (entry) => entry.restaurant.id === restaurant.id && entry.item.id === item.id,
      );
      if (existing) {
        return prev.map((entry) =>
          entry.restaurant.id === restaurant.id && entry.item.id === item.id
            ? { ...entry, qty: entry.qty + 1 }
            : entry,
        );
      }
      return [...prev, { restaurant, item, qty: 1 }];
    });
    toast.custom(() => <CartToast name={item.name} />, { duration: 2500 });
  };

  const removeFromCart = (restaurantId, itemId) => {
    setItems((prev) =>
      prev.filter(
        (entry) => !(entry.restaurant.id === restaurantId && entry.item.id === itemId),
      ),
    );
  };

  const updateQty = (restaurantId, itemId, delta) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.restaurant.id === restaurantId && entry.item.id === itemId
            ? { ...entry, qty: entry.qty + delta }
            : entry,
        )
        .filter((entry) => entry.qty > 0),
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, entry) => sum + entry.qty, 0);
    const subtotal = items.reduce(
      (sum, entry) => sum + entry.qty * entry.item.price,
      0,
    );
    const restaurantCount = new Set(items.map((entry) => entry.restaurant.id)).size;
    return {
      items,
      itemCount,
      subtotal,
      restaurantCount,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
