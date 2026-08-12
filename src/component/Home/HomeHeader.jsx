"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="w-full px-5 py-3.5 flex items-center justify-between bg-white border-b border-[#eff1f0] sticky top-0 z-40 shrink-0">
      {/* Hyatt Logo Container */}
      <Link href="/home" className="flex items-center h-8 cursor-pointer">
        <Image
          src="/hyatt_logo.png"
          alt="Hyatt Regency"
          width={160}
          height={36}
          className="h-8 w-auto object-contain object-left"
          priority
        />
      </Link>

      {/* Profile Icon Link */}
      <Link
        href="/profile"
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Profile"
      >
        <Image
          src="/profile/user.svg"
          alt="User Profile"
          width={22}
          height={22}
          className="w-5 h-5 object-contain"
        />
      </Link>
    </header>
  );
}
