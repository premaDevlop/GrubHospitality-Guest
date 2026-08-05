"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h1
          className="text-xl font-medium text-slate-900 cursor-pointer"
          onClick={() => router.push("/home/restaurant-list")}
        >
          Home page
        </h1>

        <h1
          className="text-xl font-medium text-slate-900 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          Profile
        </h1>
      </div>
    </main>
  );
}
