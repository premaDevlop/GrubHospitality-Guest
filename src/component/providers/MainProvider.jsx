"use client";

import ToastProvider from "../ui/ToastProvider";
import { CartProvider } from "./CartProvider";
import { RoomProvider } from "./RoomProvider";

export default function MainProvider({ children }) {
  return (
    <>
      <ToastProvider />
      <RoomProvider>
        <CartProvider>{children}</CartProvider>
      </RoomProvider>
    </>
  );
}