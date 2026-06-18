import { HotelDetailPage } from "@/components/HotelSubPages";

export const metadata = {
  title: "HOTEL SHUFFLE 詳細｜料金・客室・アクセス",
  description: "HOTEL SHUFFLEの雰囲気、料金、客室写真、アクセス、予約導線をまとめた詳細ページです。",
  alternates: {
    canonical: "/shuffle",
  },
};

export default function ShufflePage() {
  return <HotelDetailPage hotelId="shuffle" />;
}
