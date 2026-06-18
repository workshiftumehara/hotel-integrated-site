import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com",
  ),
  title: "制作物ライブラリ | HP・LPデザイン一覧",
  description:
    "これまで制作したHP・LP・企業サイトをサムネイル付きで確認できる統合リンク集です。",
  openGraph: {
    title: "制作物ライブラリ | HP・LPデザイン一覧",
    description:
      "これまで制作したHP・LP・企業サイトをサムネイル付きで確認できる統合リンク集です。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/showcase/hotel-shuffle.png",
        width: 1200,
        height: 630,
        alt: "制作物ライブラリ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "制作物ライブラリ",
    description: "HP・LP・企業サイトをすぐ開ける統合リンク集です。",
    images: ["/showcase/hotel-shuffle.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
