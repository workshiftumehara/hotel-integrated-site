import { PricePage } from "@/components/HotelSubPages";

export const metadata = {
  title: "料金比較｜HOTEL SHUFFLE・HOTEL REFRAIN",
  description: "HOTEL SHUFFLEとHOTEL REFRAINのREST / STAY料金目安を比較できるページです。",
  alternates: {
    canonical: "/price",
  },
};

export default function PriceRoutePage() {
  return <PricePage />;
}
