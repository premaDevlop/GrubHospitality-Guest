"use client";

import ToastProvider from "../ui/ToastProvider";
import { CartProvider } from "./CartProvider";

export default function MainProvider({ children }) {
  return (
    <>
      <ToastProvider />
      <CartProvider>{children}</CartProvider>
    </>
  );
}