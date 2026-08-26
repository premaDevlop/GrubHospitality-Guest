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
  // Active order details
  const [activeOrder, setActiveOrder] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("grubpac_active_order");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

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
  
  const clearActiveOrder = () => {
    setActiveOrder(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("grubpac_active_order");
    }
  };

  const updateActiveOrderStatus = (newStatus) => {
    setActiveOrder((prev) => {
      if (!prev) return null;
      const updated = { ...prev, status: newStatus };
      if (typeof window !== "undefined") {
        localStorage.setItem("grubpac_active_order", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const cancelOrder = ({ reason, comments }) => {
    setActiveOrder((prev) => {
      if (!prev) return null;
      const updated = { ...prev, status: "Cancelled", cancelReason: reason, cancelComments: comments };
      if (typeof window !== "undefined") {
        localStorage.setItem("grubpac_active_order", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const placeOrder = (scheduleInfo = null) => {
    const randomId = `#${Math.floor(100000 + Math.random() * 900000)}`;
    const orderItems = [...items];
    const orderData = {
      id: randomId,
      items: orderItems,
      subtotal: items.reduce((sum, entry) => sum + entry.qty * entry.item.price, 0),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: "Accepted",
      restaurantSlug: orderItems[0]?.restaurant?.slug || null,
      isScheduled: !!scheduleInfo,
      scheduleInfo: scheduleInfo || null,
    };

    setActiveOrder(orderData);
    if (typeof window !== "undefined") {
      localStorage.setItem("grubpac_active_order", JSON.stringify(orderData));
    }

    setLastOrderId(randomId);
    clearCart();
    return orderData;
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
      activeOrder,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      setKitchenNote,
      setOrderInstruction,
      placeOrder,
      clearActiveOrder,
      updateActiveOrderStatus,
      cancelOrder,
    };
  }, [items, kitchenNotes, orderInstruction, lastOrderId, activeOrder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
