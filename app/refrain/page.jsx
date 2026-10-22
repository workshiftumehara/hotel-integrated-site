import { HotelDetailPage } from "@/components/HotelSubPages";
import LineSignupPopup from "@/components/LineSignupPopup";

export const metadata = {
  title: "HOTEL REFRAIN｜池袋駅C1出口徒歩約1分の料金・客室",
  description:
    "HOTEL REFRAINは池袋駅C1出口徒歩約1分のデザイナーズホテル。RESTは2時間〜4,500円〜、STAYは1泊7,900円〜。通常チェックアウトは12:00です。",
  alternates: {
    canonical: "/refrain",
  },
};

export default function RefrainPage() {
  return (
    <>
      <HotelDetailPage hotelId="refrain" />
      <LineSignupPopup siteId="refrain" />
    </>
  );
}
