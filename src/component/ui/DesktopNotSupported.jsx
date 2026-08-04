"use client";

import { useState, useEffect } from "react";


const MOBILE_TABLET_MAX_WIDTH = 1023; 

export default function Page() {
  const [isSupported, setIsSupported] = useState(null); 

  useEffect(() => {
    function checkDevice() {
      const width = window.innerWidth;
      setIsSupported(width < MOBILE_TABLET_MAX_WIDTH);
    }

    checkDevice(); 
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

 
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
        This screen not supported, Please open in Mobile or Tablet Screens.
      </div>
    );
  }

 return null;
}