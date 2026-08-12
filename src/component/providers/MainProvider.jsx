"use client";

import ToastProvider from "../ui/ToastProvider";

export default function MainProvider({ children }) {
  return (
    <>
      <ToastProvider />
      {children}
    </>
  );
}