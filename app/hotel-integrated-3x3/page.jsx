import HomePage from "@/components/HomePage";
import { faqs, hotels } from "@/lib/hotels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com";
const pageUrl = `${siteUrl}/hotel-integrated-3x3`;

export const metadata = {
  title: "池袋のホテル比較｜HOTEL SHUFFLE・HOTEL REFRAIN 料金・地図・客室",
  description:
    "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINを、料金目安・Google Map・客室写真・予約導線で比較できる統合サイトです。",
  keywords: [
    "池袋 ホテル",
    "池袋 ラブホテル",
    "池袋 ホテル 休憩",
    "池袋 ホテル 料金",
    "池袋 ホテル 地図",
    "HOTEL SHUFFLE",
    "HOTEL REFRAIN",
  ],
  alternates: {
    canonical: "/hotel-integrated-3x3",
  },
  openGraph: {
    title: "池袋のホテル比較｜HOTEL SHUFFLE・HOTEL REFRAIN",
    description:
      "料金目安、Google Map、客室写真、予約導線まで一画面で比較。池袋駅C1出口近くの2ホテルを気分で選べます。",
    url: "/hotel-integrated-3x3",
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
    title: "池袋のホテル比較｜HOTEL SHUFFLE・HOTEL REFRAIN",
    description: "池袋駅C1出口近くの2ホテルを料金・地図・客室写真で比較できます。",
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

export default function HotelIntegratedThreeByThreePage() {
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
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "池袋のホテル比較｜HOTEL SHUFFLE・HOTEL REFRAIN",
        description:
          "池袋駅C1出口近くのHOTEL SHUFFLEとHOTEL REFRAINを、料金目安・Google Map・客室写真・予約導線で比較できるページです。",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: hotels.map((hotel) => ({ "@id": `${pageUrl}#${hotel.id}` })),
        dateModified: "2026-06-18",
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "池袋ホテル比較",
            item: pageUrl,
          },
        ],
      },
      ...hotels.map((hotel) => ({
        "@type": ["Hotel", "LodgingBusiness"],
        "@id": `${pageUrl}#${hotel.id}`,
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
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: hotel.accessText,
            value: true,
          },
        ],
        sameAs: [hotel.officialUrl, hotel.mapUrl],
      })),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#hotel-comparison`,
        name: "池袋駅C1出口近くのホテル比較",
        itemListElement: hotels.map((hotel, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": `${pageUrl}#${hotel.id}` },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
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
