"use client";

import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center gap-[1px] px-[24px] py-[8px]">
      <button
        onClick={() => router.back()}
        className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[8px] cursor-pointer"
      >
        <MdOutlineKeyboardArrowLeft
          style={{ width: "28px", height: "26px" }}
          className="text-[#6B7971]"
        />
      </button>
      <span className="text-[18px] font-normal leading-[28px] text-[#6B7971]">
        Back
      </span>
    </div>
  );
}
