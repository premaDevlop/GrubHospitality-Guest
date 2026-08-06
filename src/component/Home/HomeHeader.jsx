"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="w-full px-5 py-4 flex items-center justify-between bg-white border-b border-[#eff1f0] sticky top-0 z-40">
      <div className="h-9 w-[150px] relative">
        <Image
          src="/hyatt_logo.png"
          alt="Hyatt Regency"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      <Link
        href="/profile"
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
        aria-label="Profile"
      >
        <Image
          src="/profile/user.svg"
          alt="User Profile"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      </Link>
    </header>
  );
}
