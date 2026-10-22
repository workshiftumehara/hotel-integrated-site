export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shuffle-refrain.com";

export function absoluteUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
