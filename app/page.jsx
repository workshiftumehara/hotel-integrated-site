import HomePage from "@/components/HomePage";
import { faqs, hotels } from "@/lib/hotels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com";

export const metadata = {
  title: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
  description:
    "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINを、料金、客室写真、地図、予約導線までまとめて比較できます。",
  keywords: [
    "池袋 ホテル",
    "池袋 ラブホテル",
    "HOTEL SHUFFLE",
    "HOTEL REFRAIN",
    "池袋 ホテル 料金",
    "池袋 ホテル 地図",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
    description:
      "料金、Google Map、客室写真、予約導線まで一画面で比較。池袋駅C1出口近くの2ホテルを気分で選べます。",
    url: "/",
    siteName: "HOTEL SHUFFLE / REFRAIN",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/images/hotel-shuffle-fv.png",
        width: 1200,
        height: 900,
        alt: "HOTEL SHUFFLE 池袋",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
    description:
      "池袋駅C1出口近くの2ホテルを、料金・地図・客室写真で比較できます。",
    images: ["/images/hotel-shuffle-fv.png"],
  },
};

function offerListForHotel(hotel) {
  return hotel.pricePlans.flatMap((plan) =>
    plan.rows.map((row) => ({
      "@type": "Offer",
      name: `${hotel.shortName} ${plan.name} ${row.label}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "JPY",
        description: row.value,
      },
      availability: "https://schema.org/InStock",
      url: hotel.bookingUrl,
    })),
  );
}

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "HOTEL SHUFFLE / REFRAIN",
        url: siteUrl,
        inLanguage: "ja",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "池袋のホテル比較 | HOTEL SHUFFLE・HOTEL REFRAIN",
        description:
          "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINを、料金、Google Map、客室写真、予約導線で比較できるページです。",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: hotels.map((hotel) => ({ "@id": `${siteUrl}/#${hotel.id}` })),
        dateModified: "2026-06-18",
        inLanguage: "ja",
      },
      ...hotels.map((hotel) => ({
        "@type": ["Hotel", "LodgingBusiness"],
        "@id": `${siteUrl}/#${hotel.id}`,
        name: hotel.name,
        alternateName: hotel.shortName,
        description: hotel.seoDescription || hotel.description,
        url: hotel.officialUrl,
        telephone: hotel.telephone,
        image: [hotel.image, ...hotel.rooms.map((room) => room.src)],
        priceRange: hotel.priceGuide,
        hasMap: hotel.mapUrl,
        address: {
          "@type": "PostalAddress",
          postalCode: hotel.address.postalCode,
          streetAddress: hotel.address.streetAddress,
          addressLocality: hotel.address.addressLocality,
          addressRegion: hotel.address.addressRegion,
          addressCountry: hotel.address.addressCountry,
        },
        makesOffer: offerListForHotel(hotel),
        sameAs: [hotel.officialUrl, hotel.mapUrl],
      })),
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
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
