"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@/data/data.json";
import StayCard from "@/component/profile/StayCard";

export default function StayDetailsPage() {
  const router = useRouter();
  const { stays = [] } = data;

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none overflow-hidden font-sans">
      <div className="w-full max-w-[480px] sm:max-w-[768px] bg-[#f7f8fa] min-h-screen shadow-sm flex flex-col overflow-hidden relative pb-8">
        <header className="w-full px-5 py-4 bg-white border-b border-[#eff1f0] flex items-center gap-3 shrink-0 z-40">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <Image
              src="/restaurant/back.svg"
              alt="Back"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </button>
          <h1 className="text-lg font-bold text-[#03130a]">Back</h1>
        </header>

        <main className="flex-1 px-5 pt-4 pb-12 flex flex-col gap-4 overflow-y-auto">
          {stays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </main>
      </div>
    </div>
  );
}