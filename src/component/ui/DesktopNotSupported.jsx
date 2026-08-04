"use client";

import { useState, useEffect } from "react";

// Change these breakpoints if your definition of "mobile/tablet" differs
const MOBILE_TABLET_MAX_WIDTH = 1024; // anything above this = "not supported"

export default function Page() {
  const [isSupported, setIsSupported] = useState(null); // null = not checked yet

  useEffect(() => {
    function checkDevice() {
      const width = window.innerWidth;
      setIsSupported(width <= MOBILE_TABLET_MAX_WIDTH);
    }

    checkDevice(); // check on mount
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Avoid flashing wrong content while width is being determined
  if (isSupported === null) {
    return null;
  }

  if (!isSupported) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        This screen not supported
      </div>
    );
  }

 return null;
}