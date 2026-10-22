import Image from "next/image";
import LineCouponLink from "@/components/LineCouponLink";
import PriceTiers from "@/components/PriceTiers";
import { hotelJsonLd } from "@/lib/schema";
import { hotels, stayPolicy } from "@/lib/hotels";

const siteNav = [
  { href: "/", label: "比較トップ" },
  { href: "/shuffle", label: "SHUFFLE" },
  { href: "/refrain", label: "REFRAIN" },
  { href: "/price", label: "料金" },
  { href: "/access", label: "アクセス" },
];

function ArrowIcon() {
  return (
    <span aria-hidden="true" className="arrow-icon">
      →
    </span>
  );
}

function SubPageShell({ eyebrow, title, lead, children }) {
  return (
    <>
      <header className="subpage-header">
        <a className="top-bar-brand" href="/">
          SHUFFLE / REFRAIN
        </a>
        <nav aria-label="サイト内ページ">
          {siteNav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="subpage-main">
        <section className="subpage-hero">
          <span className="tile-label">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
        </section>
        {children}
      </main>
    </>
  );
}

function PriceRows({ hotel }) {
  return (
    <div className="sub-price-list">
      {hotel.pricePlans.map((plan) => (
        <article className="sub-price-plan" key={plan.name}>
          <h3>{plan.name}</h3>
          <dl>
            {plan.rows.map((row) => (
              <div key={`${plan.name}-${row.label}`}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <article className={`sub-hotel-card ${hotel.theme}`}>
      <div>
        <span className="tile-label">{hotel.label}</span>
        <h2>{hotel.shortName}</h2>
        <p>{hotel.summary}</p>
      </div>
      <PriceRows hotel={hotel} />
      <div className="sub-action-row">
        <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" data-hotel={hotel.id}>
          空室確認 <ArrowIcon />
        </a>
        <a href={hotel.officialUrl} target="_blank" rel="noreferrer" data-hotel={hotel.id}>
          公式サイト <ArrowIcon />
        </a>
        <LineCouponLink hotel={hotel.id} variant="text" className="line-link" />
      </div>
      {hotel.priceTiers ? <PriceTiers tiers={hotel.priceTiers} tone="paper" /> : null}
      <p className="sub-policy">{stayPolicy}</p>
    </article>
  );
}

export function HotelDetailPage({ hotelId }) {
  const hotel = hotels.find((item) => item.id === hotelId);

  return (
    <SubPageShell
      eyebrow={hotel.label}
      title={hotel.pageTitle}
      lead={`${hotel.accessText}。料金、客室、駐車場、チェックアウトを公式サイトの案内に合わせてまとめています。`}
    >
      <section className={`subpage-section hotel-detail ${hotel.theme}`}>
        <div className="detail-visual">
          <Image src={hotel.image} alt={hotel.name} width={1400} height={1000} priority />
        </div>
        <div className="detail-copy">
          <span className="tile-label">Best for</span>
          <h2>{hotel.summary}</h2>
          <p>{hotel.description}</p>
          <div className="tag-row">
            {hotel.bestFor.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <dl className="fact-list">
            <div>
              <dt>チェックアウト</dt>
              <dd>通常12:00。午前1時以降の入室は12時間保証</dd>
            </div>
            <div>
              <dt>同室人数</dt>
              <dd>{hotel.occupancy}</dd>
            </div>
            <div>
              <dt>外出</dt>
              <dd>{hotel.goingOut}</dd>
            </div>
            <div>
              <dt>駐車場</dt>
              <dd>{hotel.parking}</dd>
            </div>
          </dl>
          <div className="sub-action-row">
            <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" data-hotel={hotel.id}>
              空室確認 <ArrowIcon />
            </a>
            <a href={hotel.officialUrl} target="_blank" rel="noreferrer" data-hotel={hotel.id}>
              公式サイト <ArrowIcon />
            </a>
            <LineCouponLink hotel={hotel.id} variant="text" className="line-link" />
          </div>
        </div>
      </section>

      <section className="subpage-section">
        <div className="subsection-heading">
          <span className="tile-label">Rooms</span>
          <h2>客室写真</h2>
        </div>
        <div className="sub-room-grid">
          {hotel.rooms.map((room) => (
            <figure key={room.src}>
              <Image src={room.src} alt={room.alt} width={900} height={700} />
              <figcaption>{room.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="subpage-section">
        <div className="subsection-heading">
          <span className="tile-label">Price</span>
          <h2>料金の目安</h2>
        </div>
        <HotelCard hotel={hotel} />
      </section>

      <section className="subpage-section">
        <div className="subsection-heading">
          <span className="tile-label">Access</span>
          <h2>アクセス</h2>
          <p>{hotel.accessText}</p>
        </div>
        <iframe
          className="sub-map"
          src={hotel.mapEmbedUrl}
          title={`${hotel.name} Google Map`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="sub-policy">{hotel.parking}</p>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd(hotel)) }}
      />
    </SubPageShell>
  );
}

export function PricePage() {
  return (
    <SubPageShell
      eyebrow="Price"
      title="池袋駅C1出口のホテル料金"
      lead="SHUFFLEは平日・土日祝と曜日別、REFRAINはREST 2時間〜の目安です。空室と最終料金は予約ページで確認できます。"
    >
      <section className="subpage-section sub-two-col">
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </section>
    </SubPageShell>
  );
}

export function AccessPage() {
  return (
    <SubPageShell
      eyebrow="Access"
      title="池袋駅C1出口近くの2ホテル"
      lead="どちらも池袋駅C1出口近く。現在地からのルート確認に使いやすいアクセスページです。"
    >
      <section className="subpage-section sub-two-col">
        {hotels.map((hotel) => (
          <article className={`sub-map-card ${hotel.theme}`} key={hotel.id}>
            <div className="subsection-heading">
              <span className="tile-label">{hotel.label}</span>
              <h2>{hotel.shortName}</h2>
              <p>{hotel.accessText}</p>
              <p>{hotel.parking}</p>
            </div>
            <iframe
              className="sub-map"
              src={hotel.mapEmbedUrl}
              title={`${hotel.name} Google Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="sub-map-link" href={hotel.mapUrl} target="_blank" rel="noreferrer">
              Google Mapで開く <ArrowIcon />
            </a>
          </article>
        ))}
      </section>
    </SubPageShell>
  );
}
