import { getOfficialNews } from "@/lib/official-news";

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export default async function OfficialNews() {
  const items = await getOfficialNews();

  return (
    <section className="band light" id="news" aria-labelledby="news-heading">
      <div className="band-inner">
        <span className="ghost-num" aria-hidden="true">
          07
        </span>
        <div className="band-head" data-reveal>
          <span className="en-label">News</span>
          <h2 id="news-heading">最新のお知らせ</h2>
          <p className="band-note">
            HOTEL SHUFFLEとHOTEL REFRAINの公式サイトに出ているお知らせから、新しい3件です。
          </p>
        </div>
        <div className="news-list" data-reveal style={{ "--d": "120ms" }}>
          {items.map((item) => (
            <article className="news-item" key={`${item.hotel}-${item.date}-${item.title}`}>
              <p className="news-meta">
                <time dateTime={item.date}>{formatDate(item.date)}</time>
                <span>{item.hotelName}</span>
              </p>
              <h3>
                <a href={item.url} target="_blank" rel="noreferrer" data-hotel={item.hotel}>
                  {item.title}
                </a>
              </h3>
              {item.excerpt ? <p>{item.excerpt}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
