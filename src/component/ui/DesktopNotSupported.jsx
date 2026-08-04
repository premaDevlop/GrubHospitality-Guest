"use client";

import { useState, useEffect } from "react";

const MOBILE_TABLET_MAX_WIDTH = 1024;

export default function DesktopNotSupported({ children }) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(null);

  useEffect(() => {
    function checkDevice() {
      const width = window.innerWidth;
      setIsMobileOrTablet(width <= MOBILE_TABLET_MAX_WIDTH);
    }

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobileOrTablet === null) {
    return null;
  }

  if (!isMobileOrTablet) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "18px",
          fontWeight: "500",
          backgroundColor: "#ffffff",
          color: "#03130a",
          padding: "20px",
        }}
      >
        This screen not supported, Please open in Mobile or Tablet Screens.
      </div>
    );
  }

  return <>{children}</>;
}