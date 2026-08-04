"use client";

import { MdOutlinePersonOutline } from "react-icons/md";

export default function Icon({ name, className = "h-6 w-6" }) {
  if (name === "login_user") {
    return <MdOutlinePersonOutline className={className} />;
  }
  return <MdOutlinePersonOutline className={className} />;
}
