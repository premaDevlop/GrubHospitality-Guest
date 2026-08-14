"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // items: [{ restaurant, item, qty }] where restaurant = { id, name, slug }
  const [items, setItems] = useState([]);
  // Per-kitchen notes: { [restaurantId]: string }
  const [kitchenNotes, setKitchenNotesState] = useState({});
  // Global order instruction
  const [orderInstruction, setOrderInstructionState] = useState("");
  // Order placed flag
  const [lastOrderId, setLastOrderId] = useState(null);

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

  const clearCart = () => {
    setItems([]);
    setKitchenNotesState({});
    setOrderInstructionState("");
  };

  const setKitchenNote = (restaurantId, note) => {
    setKitchenNotesState((prev) => ({ ...prev, [restaurantId]: note }));
  };

  const setOrderInstruction = (text) => {
    setOrderInstructionState(text);
  };

  const placeOrder = () => {
    const orderId = `ORD${Date.now()}`;
    setLastOrderId(orderId);
    clearCart();
    return orderId;
  };

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
      kitchenNotes,
      orderInstruction,
      lastOrderId,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      setKitchenNote,
      setOrderInstruction,
      placeOrder,
    };
  }, [items, kitchenNotes, orderInstruction, lastOrderId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
