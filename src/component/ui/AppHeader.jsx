"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "@/component/Home/HomeHeader";

const HIDDEN_ROUTES = ["/", "/login"];

export default function AppHeader() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }

  return <HomeHeader />;
}
