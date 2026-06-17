import Image from "next/image";
import { faqs, gridTiles, hotels } from "@/lib/hotels";

const hotelById = Object.fromEntries(hotels.map((hotel) => [hotel.id, hotel]));

function SmartImage({ src, alt, priority = false, sizes = "100vw" }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1400}
      height={1000}
      sizes={sizes}
      priority={priority}
    />
  );
}

function ArrowIcon() {
  return (
    <span aria-hidden="true" className="arrow-icon">
      →
    </span>
  );
}

function ExternalLink({ href, children, variant = "dark" }) {
  return (
    <a className={`action-link ${variant}`} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function GridTile({ tile, index }) {
  const hotel = tile.hotelId ? hotelById[tile.hotelId] : null;

  if (tile.kind === "intro") {
    return (
      <article className="grid-tile tile-intro" style={{ "--delay": `${index * 45}ms` }}>
        <div className="hero-copy">
          <span className="tile-label">{tile.label}</span>
          <h1>{tile.title}</h1>
          <p>{tile.text}</p>
        </div>
        <div className="hero-highlights" aria-label="このページでできること">
          <span>雰囲気で比較</span>
          <span>写真で確認</span>
          <span>空室へ進む</span>
        </div>
        <div className="intro-actions">
          <a href="#compare">比較を見る</a>
          <a href="#rooms">客室を見る</a>
        </div>
      </article>
    );
  }

  if (tile.kind === "hotel") {
    return (
      <article className={`grid-tile tile-hotel ${hotel.theme}`} style={{ "--delay": `${index * 45}ms` }}>
        <SmartImage
          src={hotel.image}
          alt={`${hotel.name}の外観・客室イメージ`}
          priority={index < 3}
          sizes="(min-width: 980px) 33vw, 100vw"
        />
        <div className="tile-shade" />
        <div className="tile-content">
          <span className="tile-label">{hotel.label}</span>
          <h2>{hotel.shortName}</h2>
          <p>{hotel.summary}</p>
          <a href={`#${hotel.id}`} aria-label={`${hotel.name}の詳細へ`}>
            詳細を見る <ArrowIcon />
          </a>
        </div>
      </article>
    );
  }

  if (tile.kind === "photo") {
    return (
      <article className="grid-tile tile-photo" style={{ "--delay": `${index * 45}ms` }}>
        <SmartImage src={tile.src} alt={tile.alt} sizes="(min-width: 980px) 33vw, 100vw" />
        <div className="tile-shade" />
        <div className="tile-content">
          <span className="tile-label">{tile.label}</span>
          <h2>{tile.title}</h2>
        </div>
      </article>
    );
  }

  if (tile.kind === "booking") {
    return (
      <article className={`grid-tile tile-booking ${hotel.theme}`} style={{ "--delay": `${index * 45}ms` }}>
        <span className="tile-label">Booking</span>
        <h2>{hotel.shortName}</h2>
        <p>空室・料金・予約条件は、予約ページで最新情報を確認してください。</p>
        <ExternalLink href={hotel.bookingUrl} variant={hotel.theme === "shuffle" ? "gold" : "wine"}>
          空室確認
        </ExternalLink>
      </article>
    );
  }

  return (
    <article className={`grid-tile tile-${tile.kind}`} style={{ "--delay": `${index * 45}ms` }}>
      <span className="tile-label">{tile.label}</span>
      <h2>{tile.title}</h2>
      <p>{tile.text}</p>
    </article>
  );
}

function ThreeByThreeGrid() {
  return (
    <section className="grid-stage" aria-labelledby="main-heading">
      {gridTiles.map((tile, index) => (
        <GridTile tile={tile} index={index} key={tile.id} />
      ))}
    </section>
  );
}

function CompareSection() {
  return (
    <section className="section-band compare-band" id="compare" aria-labelledby="compare-heading">
      <div className="section-heading">
        <span className="tile-label">Compare</span>
        <h2 id="compare-heading">選び方は、気分でシンプルに。</h2>
      </div>
      <div className="compare-table">
        {hotels.map((hotel) => (
          <article className={`compare-panel ${hotel.theme}`} key={hotel.id}>
            <span>{hotel.label}</span>
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
            <ul>
              {hotel.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function HotelSection({ hotel }) {
  return (
    <section className={`section-band hotel-band ${hotel.theme}`} id={hotel.id} aria-labelledby={`${hotel.id}-heading`}>
      <div className="section-heading split">
        <div>
          <span className="tile-label">{hotel.tone}</span>
          <h2 id={`${hotel.id}-heading`}>{hotel.name}</h2>
        </div>
        <ExternalLink href={hotel.officialUrl} variant="light">
          公式サイト
        </ExternalLink>
      </div>

      <p className="swipe-hint" aria-hidden="true">
        Swipe
        <span>客室カードを横にスワイプ</span>
      </p>

      <div className="room-grid" id={hotel.id === "shuffle" ? "rooms" : undefined}>
        {hotel.rooms.map((room, index) => (
          <figure className={index === 0 ? "room-card featured" : "room-card"} key={room.src}>
            <SmartImage
              src={room.src}
              alt={room.alt}
              sizes={index === 0 ? "(min-width: 980px) 50vw, 100vw" : "(min-width: 980px) 25vw, 100vw"}
            />
            <figcaption>{room.label}</figcaption>
          </figure>
        ))}
        <article className="room-copy">
          <span className="tile-label">Best for</span>
          <h3>{hotel.summary}</h3>
          <div className="tag-row">
            {hotel.bestFor.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ExternalLink href={hotel.bookingUrl} variant={hotel.theme === "shuffle" ? "gold" : "wine"}>
            空室確認
          </ExternalLink>
        </article>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section-band faq-band" aria-labelledby="faq-heading">
      <div className="section-heading">
        <span className="tile-label">FAQ</span>
        <h2 id="faq-heading">予約前の小さな確認</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <article key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <header className="site-header" aria-label="サイトヘッダー">
        <a className="brand-mark" href="#top" aria-label="ページ上部へ">
          HOTEL
        </a>
        <nav aria-label="ページ内ナビゲーション">
          <a href="#compare">比較</a>
          {hotels.map((hotel) => (
            <a href={`#${hotel.id}`} key={hotel.id}>
              {hotel.shortName}
            </a>
          ))}
          <a href="#faq-heading">FAQ</a>
        </nav>
      </header>

      <main id="top">
        <h1 className="sr-only" id="main-heading">
          HOTEL SHUFFLE と HOTEL REFRAIN の統合サイト
        </h1>
        <ThreeByThreeGrid />
        <CompareSection />
        {hotels.map((hotel) => (
          <HotelSection hotel={hotel} key={hotel.id} />
        ))}
        <FaqSection />
      </main>

      <nav className="bottom-nav" aria-label="固定予約ナビゲーション">
        <a href={hotels[0].bookingUrl} target="_blank" rel="noreferrer">
          SHUFFLE
        </a>
        <a href="#compare">比較</a>
        <a href={hotels[1].bookingUrl} target="_blank" rel="noreferrer">
          REFRAIN
        </a>
      </nav>
    </>
  );
}
