import { AccessPage } from "@/components/HotelSubPages";

export const metadata = {
  title: "アクセス・地図｜HOTEL SHUFFLE・HOTEL REFRAIN",
  description: "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINの地図、住所、アクセスを確認できます。",
  alternates: {
    canonical: "/access",
  },
};

export default function AccessRoutePage() {
  return <AccessPage />;
}
