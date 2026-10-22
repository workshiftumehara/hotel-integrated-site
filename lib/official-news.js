const SHUFFLE_HOME = "https://hotelshuffle.com/";
const REFRAIN_HOME = "https://www.hotelrefrain.com/";

export const fallbackOfficialNews = [
  {
    hotel: "shuffle",
    hotelName: "HOTEL SHUFFLE",
    date: "2026-10-16",
    title: "505号室にレコードを追加しました。",
    url: "https://hotelshuffle.com/column/ikebukuro-hotel-record-player-room-505",
    excerpt: "505号室のレコードプレーヤーで楽しめるレコードを追加した案内です。",
  },
  {
    hotel: "refrain",
    hotelName: "HOTEL REFRAIN",
    date: "2026-10-01",
    title: "10月限定｜何回でも使えるLINEクーポン配布中",
    url: "https://www.hotelrefrain.com/",
    excerpt: "デイユースは500円OFF、宿泊は1,000円OFF。両ホテルで10月中ご利用いただけます。",
  },
  {
    hotel: "shuffle",
    hotelName: "HOTEL SHUFFLE",
    date: "2026-10-01",
    title: "10月限定のLINEクーポンを配布中！",
    url: "https://hotelshuffle.com/",
    excerpt: "デイユース500円OFF・宿泊1,000円OFF。平日・週末・祝日いつでも何回でも。",
  },
];

function decodeText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteLink(href, origin) {
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return "";
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return `${origin.replace(/\/$/, "")}${href}`;
  return "";
}

function linkNear(html, title, origin) {
  const marker = `>${title}<`;
  const idx = html.indexOf(marker);
  const start = idx >= 0 ? idx : html.indexOf(title);
  if (start < 0) return origin;
  const windowHtml = html.slice(start, start + 5000);
  const hrefs = [...windowHtml.matchAll(/href="([^"]+)"/g)]
    .map((match) => absoluteLink(match[1], origin))
    .filter(Boolean);
  const official = hrefs.find(
    (href) => href.includes("hotelshuffle.com") || href.includes("hotelrefrain.com"),
  );
  return official || origin;
}

function firstSentence(text) {
  const clean = decodeText(text);
  if (!clean) return "";
  const end = clean.indexOf("。");
  return end >= 0 ? clean.slice(0, end + 1) : clean.slice(0, 80);
}

function parseShuffleNews(html) {
  const start = html.indexOf(">お知らせ<");
  const slice = start >= 0 ? html.slice(start, start + 30000) : html;
  const pattern =
    /<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<time\b[^>]*dateTime="(\d{4}-\d{2}-\d{2})"[\s\S]*?<h3\b[^>]*>([\s\S]*?)<\/h3>/g;
  const items = [];

  for (const match of slice.matchAll(pattern)) {
    const title = decodeText(match[3]);
    const date = match[2];
    if (!title || !date) continue;
    items.push({
      hotel: "shuffle",
      hotelName: "HOTEL SHUFFLE",
      date,
      title,
      url: absoluteLink(match[1], SHUFFLE_HOME) || SHUFFLE_HOME,
      excerpt: "",
    });
  }

  return items;
}

function collectNewsArticles(node, found) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item) => collectNewsArticles(item, found));
    return;
  }
  if (node["@type"] === "NewsArticle" && node.headline && node.datePublished) {
    found.push(node);
  }
  Object.values(node).forEach((value) => collectNewsArticles(value, found));
}

function parseRefrainNews(html) {
  const articles = [];
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      collectNewsArticles(JSON.parse(match[1]), articles);
    } catch {
      // 壊れたJSON-LDは読み飛ばす。
    }
  }

  return articles.map((article) => {
    const title = decodeText(article.headline);
    return {
      hotel: "refrain",
      hotelName: "HOTEL REFRAIN",
      date: String(article.datePublished).slice(0, 10),
      title,
      url: linkNear(html, title, REFRAIN_HOME),
      excerpt: firstSentence(article.articleBody),
    };
  });
}

function uniqueLatest(items) {
  const seen = new Set();
  const unique = [];

  for (const item of items) {
    if (!item?.title || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !item.url) continue;
    const key = `${item.hotel}|${item.date}|${item.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  unique.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.hotel.localeCompare(b.hotel);
  });

  return unique;
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html",
      "user-agent": "shuffle-refrain-news/1.0",
    },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    throw new Error(`news fetch failed: ${response.status}`);
  }

  return response.text();
}

export async function getOfficialNews() {
  try {
    const [shuffleHtml, refrainHtml] = await Promise.all([
      fetchHtml(SHUFFLE_HOME),
      fetchHtml(REFRAIN_HOME),
    ]);
    const latest = uniqueLatest([
      ...parseShuffleNews(shuffleHtml),
      ...parseRefrainNews(refrainHtml),
    ]).slice(0, 3);

    if (latest.length < 3) return fallbackOfficialNews;
    return latest;
  } catch {
    return fallbackOfficialNews;
  }
}
