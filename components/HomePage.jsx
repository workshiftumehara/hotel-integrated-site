import Image from "next/image";
import { faqs, gridTiles, hotels } from "@/lib/hotels";

const hotelById = Object.fromEntries(hotels.map((hotel) => [hotel.id, hotel]));
const bookingTileKinds = new Set(["booking", "faq"]);

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

function PriceGuide({ children }) {
  return (
    <div className="price-guide" aria-label="料金の目安">
      <span>Price</span>
      <strong>{children}</strong>
    </div>
  );
}

function HotelTileGallery({ hotel, priority }) {
  const slides = [
    {
      src: hotel.image,
      alt: `${hotel.name}の外観・客室イメージ`,
      label: "Hotel",
    },
    ...hotel.rooms,
  ];

  return (
    <div className="tile-room-rail" aria-label={`${hotel.name}の客室写真`}>
      {slides.map((slide, slideIndex) => (
        <figure className="tile-room-slide" key={`${hotel.id}-${slide.src}-${slideIndex}`}>
          <SmartImage
            src={slide.src}
            alt={slide.alt}
            priority={priority && slideIndex === 0}
            sizes="(min-width: 980px) 33vw, 100vw"
          />
          <figcaption>{slide.label}</figcaption>
        </figure>
      ))}
      <span className="tile-swipe-hint" aria-hidden="true">
        Swipe / 客室を横にスワイプ
      </span>
    </div>
  );
}

function GridTile({ tile, index }) {
  const hotel = tile.hotelId ? hotelById[tile.hotelId] : null;

  if (tile.kind === "intro") {
    return (
      <article className="grid-tile tile-intro" style={{ "--delay": `${index * 45}ms` }}>
        <div className="hero-copy">
          <h1>{tile.title}</h1>
        </div>
        <div className="intro-actions">
          <a href="#price">料金を見る</a>
          <a href="#rooms">客室を見る</a>
        </div>
      </article>
    );
  }

  if (tile.kind === "hotel") {
    return (
      <article className={`grid-tile tile-hotel ${hotel.theme}`} style={{ "--delay": `${index * 45}ms` }}>
        <HotelTileGallery hotel={hotel} priority={index < 3} />
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

  if (tile.kind === "price") {
    return (
      <article className="grid-tile tile-price" style={{ "--delay": `${index * 45}ms` }}>
        <span className="tile-label">{tile.label}</span>
        <div className="price-mini-list">
          {hotels.map((item) => (
            <a className={`price-mini-row ${item.theme}`} href="#price" key={item.id}>
              <span>{item.shortName}</span>
              <strong>{item.priceGuide}</strong>
            </a>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className={`grid-tile tile-${tile.kind} tile-${tile.id}`} style={{ "--delay": `${index * 45}ms` }}>
      <span className="tile-label">{tile.label}</span>
      <h2>{tile.title}</h2>
      {tile.id !== "mood" && tile.text ? <p>{tile.text}</p> : null}
    </article>
  );
}

function ThreeByThreeGrid() {
  const primaryTiles = gridTiles.filter((tile) => !bookingTileKinds.has(tile.kind));

  return (
    <section className="grid-stage" aria-labelledby="main-heading">
      {primaryTiles.map((tile, index) => (
        <GridTile tile={tile} index={index} key={tile.id} />
      ))}
    </section>
  );
}

function BookingBentoSection() {
  const bookingTiles = gridTiles.filter((tile) => bookingTileKinds.has(tile.kind));

  return (
    <section className="grid-stage booking-stage" aria-label="予約導線">
      {bookingTiles.map((tile, index) => (
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

function PriceTableSection() {
  return (
    <section className="section-band price-band" id="price" aria-labelledby="price-heading">
      <div className="section-heading split">
        <div>
          <span className="tile-label">Price</span>
          <h2 id="price-heading">料金の目安</h2>
        </div>
        <p className="section-note">公式サイト掲載料金をもとにした目安です。最新条件は各公式サイトで確認してください。</p>
      </div>
      <div className="price-table-grid">
        {hotels.map((hotel) => (
          <article className={`price-table-card ${hotel.theme}`} key={hotel.id}>
            <div className="price-table-head">
              <span>{hotel.label}</span>
              <h3>{hotel.shortName}</h3>
            </div>
            <div className="price-plan-list">
              {hotel.pricePlans.map((plan) => (
                <div className="price-plan" key={plan.name}>
                  <p>{plan.name}</p>
                  <dl>
                    {plan.rows.map((row) => (
                      <div key={`${plan.name}-${row.label}`}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="price-note">{hotel.priceNote}</p>
            <ExternalLink href={hotel.officialUrl} variant={hotel.theme === "shuffle" ? "gold" : "wine"}>
              公式料金を見る
            </ExternalLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function SearchSummarySection() {
  return (
    <section className="section-band search-summary" aria-labelledby="search-summary-heading">
      <div className="section-heading">
        <span className="tile-label">Quick Answer</span>
        <h2 id="search-summary-heading">池袋でホテルを選ぶなら</h2>
      </div>
      <div className="answer-grid">
        <article>
          <h3>SHUFFLE</h3>
          <p>
            HOTEL SHUFFLEは、池袋駅C1出口近くで落ち着いた雰囲気を重視したい日に選びやすいホテルです。
          </p>
        </article>
        <article>
          <h3>REFRAIN</h3>
          <p>
            HOTEL REFRAINは、明るく入りやすい雰囲気で気軽な滞在に向いたホテルです。
          </p>
        </article>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="section-band map-band" id="map" aria-label="Google Map">
      <div className="section-heading split">
        <div>
          <span className="tile-label">Map</span>
        </div>
        <p className="section-note">どちらも池袋駅C1出口近く。移動前に現在地からのルートを確認できます。</p>
      </div>
      <div className="map-grid">
        {hotels.map((hotel) => (
          <article className={`map-card ${hotel.theme}`} key={hotel.id}>
            <div className="map-card-head">
              <span>{hotel.label}</span>
              <h3>{hotel.shortName}</h3>
            </div>
            <iframe
              src={hotel.mapEmbedUrl}
              title={`${hotel.name} Google Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-link" href={hotel.mapUrl} target="_blank" rel="noreferrer">
              Google Mapで開く <ArrowIcon />
            </a>
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
          <PriceGuide>{hotel.priceGuide}</PriceGuide>
          <ExternalLink href={hotel.bookingUrl} variant={hotel.theme === "shuffle" ? "gold" : "wine"}>
            空室確認
          </ExternalLink>
        </article>
      </div>
    </section>
  );
}

function StayScenesSection() {
  return (
    <section className="section-band stay-band" aria-labelledby="stay-heading">
      <div className="section-heading">
        <span className="tile-label">Stay Scene</span>
        <h2 id="stay-heading">泊まる前に、過ごし方を想像する。</h2>
      </div>
      <div className="stay-scene-grid">
        {hotels.map((hotel) => (
          <article className={`stay-scene-panel ${hotel.theme}`} key={hotel.id}>
            <div className="stay-scene-copy">
              <span className="tile-label">{hotel.shortName}</span>
              <h3>{hotel.tone}</h3>
              <p>{hotel.summary}</p>
            </div>
            <div className="stay-scene-rail" aria-label={`${hotel.name}の滞在シーン`}>
              {hotel.scenes.map((scene, index) => (
                <figure className={index === 0 ? "stay-scene-card featured" : "stay-scene-card"} key={scene.src}>
                  <SmartImage
                    src={scene.src}
                    alt={scene.alt}
                    sizes={index === 0 ? "(min-width: 980px) 42vw, 86vw" : "(min-width: 980px) 20vw, 76vw"}
                  />
                  <figcaption>{scene.label}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
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
      <header className="top-bar" aria-label="ページナビゲーション">
        <a className="top-bar-brand" href="/" aria-label="ページ上部へ">
          SHUFFLE / REFRAIN
        </a>
        <nav aria-label="主要セクション">
          <a href="#price">料金</a>
        </nav>
      </header>

      <main id="top">
        <h1 className="sr-only" id="main-heading">
          HOTEL SHUFFLE と HOTEL REFRAIN の統合サイト
        </h1>
        <ThreeByThreeGrid />
        <StayScenesSection />
        <SearchSummarySection />
        <PriceTableSection />
        <CompareSection />
        <BookingBentoSection />
        {hotels.map((hotel) => (
          <HotelSection hotel={hotel} key={hotel.id} />
        ))}
        <MapSection />
        <FaqSection />
      </main>

      <nav className="bottom-nav" aria-label="固定予約ナビゲーション">
        <a href={hotels[0].bookingUrl} target="_blank" rel="noreferrer">
          SHUFFLE
        </a>
        <a href="#price">料金</a>
        <a href={hotels[1].bookingUrl} target="_blank" rel="noreferrer">
          REFRAIN
        </a>
      </nav>
    </>
  );
}
