import Image from "next/image";
import Reveal from "@/components/Reveal";
import LineSignupPopup from "@/components/LineSignupPopup";
import LineCouponLink from "@/components/LineCouponLink";
import OfficialNews from "@/components/OfficialNews";
import PriceTiers from "@/components/PriceTiers";
import { lineCoupon } from "@/lib/line-coupon";
import { faqs, hotels, stayPolicy } from "@/lib/hotels";

const [shuffle, refrain] = hotels;

const moodRows = [
  {
    axis: "Mood",
    shuffle: "落ち着いた上質感",
    refrain: "気軽で明るい雰囲気",
  },
  {
    axis: "Best for",
    shuffle: shuffle.bestFor.join("・"),
    refrain: refrain.bestFor.join("・"),
  },
  {
    axis: "Price",
    shuffle: shuffle.priceGuide,
    refrain: refrain.priceGuide,
  },
];

function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      →
    </span>
  );
}

function HeroPanel({ hotel, catchCopy, priority }) {
  const isShuffle = hotel.theme === "shuffle";

  return (
    <div className={`hero-panel ${hotel.theme}`}>
      <div className="hero-media">
        <Image
          src={hotel.image}
          alt={`${hotel.name}のイメージ`}
          fill
          priority={priority}
          sizes="(min-width: 981px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-content">
        <span className="en-label">{hotel.label}</span>
        <h2>{hotel.shortName}</h2>
        <p className="hero-copy">{catchCopy}</p>
        <div className="hero-cta-row">
          <a
            className={`btn ${isShuffle ? "gold" : "wine"}`}
            href={hotel.officialUrl}
            target="_blank"
            rel="noreferrer"
            data-hotel={hotel.id}
          >
            公式HP <Arrow />
          </a>
          <a
            className="text-link"
            href={hotel.officialUrl}
            target="_blank"
            rel="noreferrer"
            data-hotel={hotel.id}
          >
            詳しく <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

function HotelBand({ hotel, num, catchCopy, railId }) {
  const isShuffle = hotel.theme === "shuffle";

  return (
    <section
      className={`band ${isShuffle ? "dark" : "light"}`}
      id={hotel.id}
      aria-labelledby={`${hotel.id}-heading`}
    >
      <div className="band-inner">
        <span className="ghost-num" aria-hidden="true">
          {num}
        </span>
        <div className="hotel-head" data-reveal>
          <div>
            <span className={`en-label ${isShuffle ? "" : "wine"}`}>{hotel.label}</span>
            <h2 id={`${hotel.id}-heading`}>{hotel.shortName}</h2>
            <p className="hotel-catch">{catchCopy}</p>
          </div>
          <a
            className="text-link"
            href={hotel.officialUrl}
            target="_blank"
            rel="noreferrer"
            data-hotel={hotel.id}
          >
            公式サイト <Arrow />
          </a>
        </div>

        <div className="room-rail" id={railId} data-reveal style={{ "--d": "120ms" }}>
          {hotel.rooms.map((room) => (
            <figure className="room-card" key={room.src}>
              <Image
                src={room.src}
                alt={room.alt}
                width={900}
                height={675}
                sizes="(min-width: 981px) 25vw, 76vw"
              />
              <figcaption>{room.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="rail-hint" aria-hidden="true">
          Swipe —
        </p>

        <div className="hotel-foot" data-reveal>
          <div>
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.9,
                maxWidth: "34em",
                marginBottom: "18px",
              }}
            >
              {hotel.description}
            </p>
            <div className="tag-row">
              {hotel.bestFor.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div className="price-guide-line">
              <span className={`en-label ${isShuffle ? "" : "wine"}`}>Price</span>
              <strong>{hotel.priceGuide}</strong>
            </div>
            <div className="hotel-cta-row">
              <a
                className={`btn ${isShuffle ? "gold" : "wine"}`}
                href={hotel.bookingUrl}
                target="_blank"
                rel="noreferrer"
                data-hotel={hotel.id}
              >
                空室確認 <Arrow />
              </a>
              <LineCouponLink hotel={hotel.id} variant="text" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Reveal />

      <header className="site-head" aria-label="ページナビゲーション">
        <a className="brand" href="/" aria-label="ページ上部へ">
          SHUFFLE / REFRAIN
        </a>
        <nav aria-label="主要セクション">
          <a href="#price">料金</a>
          <a href="#map">アクセス</a>
        </nav>
      </header>

      <main id="top">
        {/* FV — 明暗スプリット */}
        <section className="hero" aria-labelledby="main-heading">
            <div className="hero-center">
            <h1 id="main-heading">池袋駅C1出口徒歩1分のホテル SHUFFLE・REFRAIN</h1>
            <p className="hero-tagline">今夜は、どちらの気分。</p>
            <p className="hero-en">Ikebukuro — Two Hotels, One Exit</p>
          </div>
          <HeroPanel hotel={shuffle} catchCopy="少し背伸びした、静かな夜に。" priority />
          <HeroPanel hotel={refrain} catchCopy="肩の力を抜いて、軽やかな夜に。" />
          <span className="scroll-cue" aria-hidden="true">
            Scroll
          </span>
        </section>

        {/* 01 Mood */}
        <section className="band light" id="mood" aria-labelledby="mood-heading">
          <div className="band-inner">
            <span className="ghost-num" aria-hidden="true">
              01
            </span>
            <div className="band-head" data-reveal>
              <span className="en-label">Mood</span>
              <h2 id="mood-heading">
                選ぶのは、
                <br className="sp-br" />
                部屋じゃなく気分。
              </h2>
              <p className="band-note">
                どちらも池袋駅C1出口から徒歩約1分。違うのは、夜の過ごし方だけ。
              </p>
            </div>
            <div className="mood-table" data-reveal style={{ "--d": "120ms" }}>
              {moodRows.map((row) => (
                <div className="mood-row" key={row.axis}>
                  <span className="mood-axis">{row.axis}</span>
                  <p className="mood-cell shuffle">
                    <strong>SHUFFLE</strong>
                    {row.shuffle}
                  </p>
                  <p className="mood-cell refrain">
                    <strong>REFRAIN</strong>
                    {row.refrain}
                  </p>
                </div>
              ))}
            </div>
            <section className="choice-guide" aria-labelledby="choice-guide-heading" data-reveal style={{ "--d": "180ms" }}>
              <span className="en-label">Quick answer</span>
              <h3 id="choice-guide-heading">どちらを選ぶ？</h3>
              <ul>
                <li>初めての利用やモダンな空間が好みなら HOTEL SHUFFLE。</li>
                <li>隠れ家的なデザイナーズ空間でゆっくり過ごすなら HOTEL REFRAIN。</li>
                <li>デイユース料金の安さを重視するなら HOTEL REFRAIN。</li>
                <li>記念日や大人っぽい雰囲気を重視するなら HOTEL SHUFFLE。</li>
              </ul>
              <a
                className="text-link choice-guide-link"
                href="https://hotelshuffle.com/column/ikebukuro-lovehotel-recommend-choice-refrain-shuffle"
                target="_blank"
                rel="noreferrer"
              >
                SHUFFLEの池袋ホテル選びガイドを読む <Arrow />
              </a>
            </section>
          </div>
        </section>

        {/* 02 SHUFFLE / 03 REFRAIN */}
        <HotelBand hotel={shuffle} num="02" catchCopy="少し背伸びした、静かな夜に。" railId="rooms" />
        <HotelBand hotel={refrain} num="03" catchCopy="肩の力を抜いて、軽やかな夜に。" />

        {/* 04 Price — 暗室 */}
        <section className="band dark raise" id="price" aria-labelledby="price-heading">
          <div className="band-inner">
            <span className="ghost-num" aria-hidden="true">
              04
            </span>
            <div className="band-head" data-reveal>
              <span className="en-label">Price</span>
              <h2 id="price-heading">
                夜の予算は、
                <br className="sp-br" />
                先にわかると安心。
              </h2>
              <p className="band-note">
                公式サイト掲載料金をもとにした税込の目安です。{stayPolicy}
              </p>
            </div>
            <div className="price-grid">
              {hotels.map((hotel, index) => (
                <div
                  className={`price-col ${hotel.theme}`}
                  key={hotel.id}
                  data-reveal
                  style={{ "--d": `${index * 120}ms` }}
                >
                  <div className="price-col-head">
                    <h3>{hotel.shortName}</h3>
                    <span className={`en-label ${hotel.theme === "shuffle" ? "" : "rose"}`}>
                      {hotel.label}
                    </span>
                  </div>
                  {hotel.pricePlans.map((plan) => (
                    <div className="plan-group" key={plan.name}>
                      <h4>{plan.name}</h4>
                      <dl>
                        {plan.rows.map((row) => (
                          <div
                            className={`plan-row${plan.compact ? " is-compact" : ""}`}
                            key={`${plan.name}-${row.label}`}
                          >
                            <dt>{row.label}</dt>
                            <dd>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                  <p className="price-note">{hotel.priceNote}</p>
                  <div className="price-cta-row">
                    <a
                      className={`btn ${hotel.theme === "shuffle" ? "gold" : "wine"}`}
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-hotel={hotel.id}
                    >
                      空室確認 <Arrow />
                    </a>
                    <LineCouponLink hotel={hotel.id} variant="button" />
                    <a
                      className="btn ghost-night"
                      href={hotel.priceUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-hotel={hotel.id}
                    >
                      {hotel.shortName}の休憩・宿泊料金 <Arrow />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {hotels
              .filter((hotel) => hotel.priceTiers)
              .map((hotel) => (
                <PriceTiers tiers={hotel.priceTiers} key={`${hotel.id}-tiers`} />
              ))}
          </div>
        </section>

        {/* 05 Scene */}
        <section className="band light" id="stay" aria-labelledby="stay-heading">
          <div className="band-inner">
            <span className="ghost-num" aria-hidden="true">
              05
            </span>
            <div className="band-head" data-reveal>
              <span className="en-label">Stay Scene</span>
              <h2 id="stay-heading">
                ふたりの夜に、
                <br className="sp-br" />
                ちょうどいい空気を。
              </h2>
            </div>
            {hotels.map((hotel, index) => (
              <div className="scene-block" key={hotel.id} data-reveal style={{ "--d": `${index * 100}ms` }}>
                <div className="scene-block-head">
                  <h3>{hotel.shortName}</h3>
                  <p>{hotel.tone}</p>
                </div>
                <div className="scene-rail" aria-label={`${hotel.name}の滞在シーン`}>
                  {hotel.scenes.map((scene) => (
                    <figure className="scene-card" key={scene.src}>
                      <Image
                        src={scene.src}
                        alt={scene.alt}
                        width={720}
                        height={960}
                        sizes="(min-width: 981px) 25vw, 66vw"
                      />
                      <figcaption>{scene.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 Access */}
        <section className="band tint" id="map" aria-labelledby="access-heading">
          <div className="band-inner">
            <span className="ghost-num" aria-hidden="true">
              06
            </span>
            <div className="band-head" data-reveal>
              <span className="en-label">Access</span>
              <h2 id="access-heading">C1出口から、すぐ近く。</h2>
              <p className="band-note">
                どちらも池袋駅C1出口のすぐ近く。現在地からのルートを確認できます。
              </p>
            </div>
            <div className="access-grid">
              {hotels.map((hotel, index) => (
                <article className="map-card" key={hotel.id} data-reveal style={{ "--d": `${index * 120}ms` }}>
                  <div className="map-card-head">
                    <h3>{hotel.shortName}</h3>
                    <span className={`en-label ${hotel.theme === "shuffle" ? "" : "wine"}`}>
                      {hotel.label}
                    </span>
                  </div>
                  <p className="map-address">
                    〒{hotel.address.postalCode} {hotel.address.addressRegion}
                    {hotel.address.addressLocality}
                    {hotel.address.streetAddress}／{hotel.accessText}
                  </p>
                  <p className="map-address">{hotel.parking}</p>
                  <iframe
                    src={hotel.mapEmbedUrl}
                    title={`${hotel.name} Google Map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a className="text-link" href={hotel.mapUrl} target="_blank" rel="noreferrer">
                    Google Mapで開く <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OfficialNews />

        {/* 08 FAQ */}
        <section className="band light" aria-labelledby="faq-heading">
          <div className="band-inner">
            <span className="ghost-num" aria-hidden="true">
              08
            </span>
            <div className="band-head" data-reveal>
              <span className="en-label">Q &amp; A</span>
              <h2 id="faq-heading">予約前の小さな確認。</h2>
            </div>
            <div className="faq-rows" data-reveal style={{ "--d": "120ms" }}>
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 最終CTA */}
        <section className="band dark final-cta" aria-label="予約">
          <div className="band-inner">
            <div data-reveal>
              <span className="en-label">Booking</span>
              <h2>迷ったら、今夜の気分で。</h2>
              <p>空室状況と最新料金は、各予約ページで確認できます。</p>
            </div>
            <div className="final-cta-row" data-reveal style={{ "--d": "140ms" }}>
              <a
                className="btn gold"
                href={shuffle.bookingUrl}
                target="_blank"
                rel="noreferrer"
                data-hotel="shuffle"
              >
                SHUFFLE 空室確認 <Arrow />
              </a>
              <a
                className="btn wine"
                href={refrain.bookingUrl}
                target="_blank"
                rel="noreferrer"
                data-hotel="refrain"
              >
                REFRAIN 空室確認 <Arrow />
              </a>
              <LineCouponLink hotel="both" variant="button" />
            </div>
            <p className="final-line-note" data-reveal style={{ "--d": "180ms" }}>
              {lineCoupon.note}
            </p>
            <div className="final-tel" data-reveal style={{ "--d": "220ms" }}>
              {hotels.map((hotel) => (
                <span key={hotel.id}>
                  {hotel.shortName}
                  <a href={`tel:${hotel.telephone.replace(/-/g, "")}`} data-hotel={hotel.id}>
                    {hotel.telephone}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="site-foot-inner">
          <span className="brand">SHUFFLE / REFRAIN</span>
          <nav aria-label="サイト内ページ">
            <a href="/shuffle">SHUFFLE詳細</a>
            <a href="/refrain">REFRAIN詳細</a>
            <a href="/price">料金</a>
            <a href="/access">アクセス</a>
          </nav>
          <small>&copy; HOTEL SHUFFLE / HOTEL REFRAIN — Ikebukuro</small>
        </div>
      </footer>

      <div className="bottom-dock">
        <LineCouponLink hotel="both" variant="sticky" />
        <nav className="bottom-nav" aria-label="固定予約ナビゲーション">
          <a
            className="nav-shuffle"
            href={shuffle.bookingUrl}
            target="_blank"
            rel="noreferrer"
            data-hotel="shuffle"
          >
            SHUFFLE
            <small>空室確認</small>
          </a>
          <a className="nav-price" href="#price">
            料金
          </a>
          <a
            className="nav-refrain"
            href={refrain.bookingUrl}
            target="_blank"
            rel="noreferrer"
            data-hotel="refrain"
          >
            REFRAIN
            <small>空室確認</small>
          </a>
        </nav>
      </div>

      <LineSignupPopup siteId="integrated" />
    </>
  );
}
