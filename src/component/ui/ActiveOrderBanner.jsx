"use client";

import { useCart } from "@/component/providers/CartProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ActiveOrderBanner() {
  const router = useRouter();
  const { activeOrder } = useCart();

  if (!activeOrder) return null;

  // Map status to user friendly text
  const getStatusText = (status) => {
    switch (status) {
      case "Accepted":
        return "Order Accepted";
      case "Prepared":
        return "Preparing your food...";
      case "Ready":
        return "Order Ready for delivery";
      case "Delivery":
        return "Order out for delivery";
      default:
        return "Preparing your food...";
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[448px] sm:max-w-[736px] bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e0e3e1] flex items-center justify-between z-40 animate-slide-up transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
          <Image
            src="/profile/delivery_bike.svg"
            alt="Delivery"
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#03130a]">Order Status</span>
          <span className="text-xxs text-[#6b7971] mt-0.5 font-medium">
            {getStatusText(activeOrder.status)}
          </span>
        </div>
      </div>
      
      <button
        type="button"
        onClick={() => router.push("/order-status")}
        className="flex items-center gap-1.5 border border-[#fe480b] text-[#fe480b] rounded-lg px-3 py-1.5 text-xxs font-bold uppercase cursor-pointer hover:bg-red-50 transition-colors"
      >
        Track Order
        <Image
          src="/profile/chevron_right_red.svg"
          alt="Track"
          width={10}
          height={10}
          className="w-2.5 h-2.5 object-contain"
        />
      </button>
    </div>
  );
}
