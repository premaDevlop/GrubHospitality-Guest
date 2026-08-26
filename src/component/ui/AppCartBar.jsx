"use client";

import { usePathname } from "next/navigation";
import CartCheckoutBar from "@/component/ui/CartCheckoutBar";

const HIDDEN_ROUTES = ["/", "/login", "/cart"];

export default function AppCartBar() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }

  return <CartCheckoutBar />;
}
