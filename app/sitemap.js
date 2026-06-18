const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com";

export default function sitemap() {
  const lastModified = new Date("2026-06-18");

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shuffle`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/refrain`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/price`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/access`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
