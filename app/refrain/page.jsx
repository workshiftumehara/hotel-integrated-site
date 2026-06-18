import { HotelDetailPage } from "@/components/HotelSubPages";

export const metadata = {
  title: "HOTEL REFRAIN 詳細｜料金・客室・アクセス",
  description: "HOTEL REFRAINの雰囲気、料金、客室写真、アクセス、予約導線をまとめた詳細ページです。",
  alternates: {
    canonical: "/refrain",
  },
};

export default function RefrainPage() {
  return <HotelDetailPage hotelId="refrain" />;
}
