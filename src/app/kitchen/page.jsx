import { redirect } from "next/navigation";
import data from "@/data/data.json";

export default function KitchenIndex() {
  const first = data.restaurants[0];
  redirect(first ? `/kitchen/${first.slug}` : "/home");
}