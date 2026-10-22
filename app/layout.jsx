import "./globals.css";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Analytics from "@/components/Analytics";

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-en",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com",
  ),
  title: {
    default: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
  },
  description:
    "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINを、料金、客室写真、地図、予約導線までまとめて比較できます。",
  openGraph: {
    title: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
    description:
      "池袋駅C1出口近くの2ホテルを、料金・地図・客室写真で比較。今夜の気分で選べます。",
    type: "website",
    locale: "ja_JP",
    siteName: "HOTEL SHUFFLE / REFRAIN",
    images: [
      {
        url: "/images/hotel-shuffle-fv.jpg",
        width: 1086,
        height: 1448,
        alt: "池袋駅C1出口徒歩1分のHOTEL SHUFFLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
    description:
      "池袋駅C1出口近くの2ホテルを、料金・地図・客室写真で比較できます。",
    images: ["/images/hotel-shuffle-fv.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${serif.variable} ${sans.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
