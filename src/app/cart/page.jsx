"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HomeHeader from "@/component/Home/HomeHeader";
import { useCart } from "@/component/providers/CartProvider";

export default function CartPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, updateQty, removeFromCart, clearCart } =
    useCart();

  const deliveryFee = subtotal > 0 ? 49 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  return (
    <div className="w-full min-h-screen bg-[#f8faf9] flex flex-col items-center select-none">
      <div className="w-full max-w-[480px] sm:max-w-[768px] min-h-screen bg-white shadow-sm flex flex-col pb-24">
        <HomeHeader />

        <main className="flex-1 px-5 pt-4 flex flex-col gap-5">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
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
              <h1 className="text-lg font-bold text-[#03130a]">
                My Cart{items.length > 0 ? ` (${itemCount})` : ""}
              </h1>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-[#6b7971] uppercase tracking-wider hover:text-[#fe480b] transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-[#f7f8fa] flex items-center justify-center">
                <Image
                  src="/kitchen/list.png"
                  alt="Empty cart"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-[#03130a]">
                  Your cart is empty
                </h2>
                <p className="text-sm text-[#6b7971]">
                  Add dishes from any restaurant to get started.
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="mt-2 px-6 py-2.5 border border-[#fe480b] text-[#fe480b] hover:bg-red-50 rounded-xl text-sm font-bold uppercase transition-colors cursor-pointer"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items Grouped by Restaurant */}
              <div className="flex flex-col gap-5">
                {Object.values(
                  items.reduce((groups, entry) => {
                    const key = entry.restaurant.id;
                    if (!groups[key]) {
                      groups[key] = {
                        restaurant: entry.restaurant,
                        entries: [],
                      };
                    }
                    groups[key].entries.push(entry);
                    return groups;
                  }, {}),
                ).map(({ restaurant, entries }) => (
                  <section
                    key={restaurant.id}
                    className="flex flex-col gap-3 border border-[#e0e3e1] rounded-2xl p-4 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => router.push(`/kitchen/${restaurant.slug}`)}
                      className="flex items-center gap-2 text-left cursor-pointer group"
                    >
                      <h2 className="text-sm font-bold text-[#03130a] group-hover:text-[#fe480b] transition-colors">
                        {restaurant.name}
                      </h2>
                      <Image
                        src="/kitchen/arrow_right.svg"
                        alt="Open menu"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain opacity-60 group-hover:opacity-100"
                      />
                    </button>

                    <div className="flex flex-col gap-3 border-t border-[#eff1f0] pt-3">
                      {entries.map((entry) => (
                        <div
                          key={entry.item.id}
                          className="flex items-start gap-3"
                        >
                          <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0 border border-slate-100">
                            <Image
                              src={entry.item.image || "/food-items/restaurant.jpg"}
                              alt={entry.item.name}
                              fill
                              className="object-cover object-center"
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-[#03130a] truncate">
                              {entry.item.name}
                            </h3>
                            <span className="text-xs text-[#6b7971]">
                              ₹ {entry.item.price}
                            </span>

                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center border border-[#e0e3e1] rounded-lg">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQty(
                                      restaurant.id,
                                      entry.item.id,
                                      -1,
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center text-[#fe480b] font-bold cursor-pointer hover:bg-slate-50"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-7 text-center text-sm font-semibold text-[#03130a]">
                                  {entry.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQty(restaurant.id, entry.item.id, 1)
                                  }
                                  className="w-7 h-7 flex items-center justify-center text-[#fe480b] font-bold cursor-pointer hover:bg-slate-50"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(restaurant.id, entry.item.id)
                                }
                                className="text-xs font-medium text-[#6b7971] hover:text-[#fe480b] transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <span className="text-sm font-bold text-[#03130a] shrink-0">
                            ₹ {entry.item.price * entry.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Bill Summary */}
              <section className="flex flex-col gap-3 border border-[#e0e3e1] rounded-2xl p-4 bg-white">
                <h2 className="text-sm font-bold text-[#03130a]">
                  Bill Details
                </h2>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7971]">Item Total</span>
                    <span className="font-semibold text-[#03130a]">
                      ₹ {subtotal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7971]">Delivery Fee</span>
                    <span className="font-semibold text-[#03130a]">
                      ₹ {deliveryFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7971]">GST (5%)</span>
                    <span className="font-semibold text-[#03130a]">
                      ₹ {gst}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#eff1f0] pt-2.5 mt-1">
                    <span className="font-bold text-[#03130a]">To Pay</span>
                    <span className="font-bold text-[#fe480b]">
                      ₹ {total}
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        {/* Place Order Bar */}
        {items.length > 0 && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] sm:max-w-[768px] px-5 py-3 bg-white border-t border-[#eff1f0]">
            <button
              type="button"
              onClick={() => router.push("/order-status")}
              className="w-full py-3.5 bg-[#fe480b] text-white rounded-xl text-sm font-bold uppercase tracking-wide transition-colors hover:bg-[#e4450a] cursor-pointer"
            >
              Place Order · ₹ {total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}