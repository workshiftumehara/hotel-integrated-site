import { HotelDetailPage } from "@/components/HotelSubPages";
import LineSignupPopup from "@/components/LineSignupPopup";

export const metadata = {
  title: "HOTEL SHUFFLE｜池袋駅C1出口徒歩1分の料金・客室",
  description:
    "HOTEL SHUFFLEは池袋駅西口C1出口徒歩1分。RESTは平日4,800円〜・土日祝5,300円〜、STAYは日〜木7,900円〜。通常チェックアウトは12:00です。",
  alternates: {
    canonical: "/shuffle",
  },
};

export default function ShufflePage() {
  return (
    <>
      <HotelDetailPage hotelId="shuffle" />
      <LineSignupPopup siteId="shuffle" />
    </>
  );
}
