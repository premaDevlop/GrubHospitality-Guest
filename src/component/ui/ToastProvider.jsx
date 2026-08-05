"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          margin: 0,
          maxWidth: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        },
      }}
      containerStyle={{
        top: 16,
        left: 16,
        right: 16,
        zIndex: 10000,
      }}
    />
  );
}