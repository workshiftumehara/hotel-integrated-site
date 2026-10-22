import { absoluteUrl, siteUrl } from "@/lib/site";

export function hotelNode(hotel) {
  const images = [
    ...new Set(
      [hotel.image, ...hotel.rooms.map((room) => room.src)].filter(Boolean).map(absoluteUrl),
    ),
  ];

  return {
    "@type": "Hotel",
    "@id": `${siteUrl}/${hotel.id}#hotel`,
    name: hotel.name,
    alternateName: hotel.shortName,
    description: hotel.seoDescription || hotel.description,
    url: `${siteUrl}/${hotel.id}`,
    telephone: hotel.telephone,
    image: images,
    priceRange: hotel.priceRange || hotel.priceGuide,
    currenciesAccepted: "JPY",
    paymentAccepted: "Cash, Credit Card",
    checkoutTime: hotel.checkoutTime,
    hasMap: hotel.mapUrl,
    address: {
      "@type": "PostalAddress",
      postalCode: hotel.address.postalCode,
      streetAddress: hotel.address.streetAddress,
      addressLocality: hotel.address.addressLocality,
      addressRegion: hotel.address.addressRegion,
      addressCountry: hotel.address.addressCountry,
    },
    ...(hotel.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: hotel.geo.latitude,
            longitude: hotel.geo.longitude,
          },
        }
      : {}),
    amenityFeature: (hotel.amenities || []).map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "通常チェックアウト",
        value: "12:00",
      },
      {
        "@type": "PropertyValue",
        name: "午前1時以降の入室",
        value: "入室から12時間の滞在を保証",
      },
      {
        "@type": "PropertyValue",
        name: "同室人数",
        value: "2名まで",
      },
    ],
    makesOffer: (hotel.pricePlans || []).flatMap((plan) =>
      plan.rows.map((row) => ({
        "@type": "Offer",
        name: `${hotel.shortName} ${plan.name} ${row.label}`,
        priceCurrency: "JPY",
        description: row.value,
        url: hotel.bookingUrl,
      })),
    ),
    sameAs: [hotel.officialUrl, hotel.mapUrl, hotel.bookingUrl].filter(Boolean),
  };
}

export function hotelJsonLd(hotel) {
  return {
    "@context": "https://schema.org",
    ...hotelNode(hotel),
  };
}
