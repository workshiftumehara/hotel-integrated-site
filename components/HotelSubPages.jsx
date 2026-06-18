import Image from "next/image";
import { hotels } from "@/lib/hotels";

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
        <a href={hotel.bookingUrl} target="_blank" rel="noreferrer">
          空室確認 <ArrowIcon />
        </a>
        <a href={hotel.officialUrl} target="_blank" rel="noreferrer">
          公式サイト <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export function HotelDetailPage({ hotelId }) {
  const hotel = hotels.find((item) => item.id === hotelId);

  return (
    <SubPageShell
      eyebrow={hotel.label}
      title={`${hotel.shortName}を詳しく見る`}
      lead={`${hotel.shortName}の雰囲気、客室写真、料金、アクセス、予約導線をまとめました。`}
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
          <div className="sub-action-row">
            <a href={hotel.bookingUrl} target="_blank" rel="noreferrer">
              空室確認 <ArrowIcon />
            </a>
            <a href={hotel.officialUrl} target="_blank" rel="noreferrer">
              公式サイト <ArrowIcon />
            </a>
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
      </section>
    </SubPageShell>
  );
}

export function PricePage() {
  return (
    <SubPageShell
      eyebrow="Price"
      title="料金を比較する"
      lead="SHUFFLEとREFRAINのREST / STAYの目安を、予約前にまとめて確認できます。"
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
