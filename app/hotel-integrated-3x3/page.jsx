import HomePage from "@/components/HomePage";
import { faqs, hotels } from "@/lib/hotels";

export const metadata = {
  title: "HOTEL SHUFFLE / REFRAIN | Neon Bento Grid",
  description:
    "HOTEL SHUFFLEとHOTEL REFRAINを、ネオンホテル風のBento Gridで比較できる池袋の統合サイトです。",
};

export default function HotelIntegratedThreeByThreePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ...hotels.map((hotel) => ({
        "@type": "LodgingBusiness",
        name: hotel.name,
        description: hotel.description,
        url: hotel.officialUrl,
        image: [hotel.image, ...hotel.rooms.map((room) => room.src)],
        address: {
          "@type": "PostalAddress",
          addressLocality: "豊島区",
          addressRegion: "東京都",
          addressCountry: "JP",
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
