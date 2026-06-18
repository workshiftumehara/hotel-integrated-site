export const bookingUrls = {
  shuffle: "https://www.booking.com/hotel/jp/shuffle.ja.html",
  refrain:
    "https://www.booking.com/hotel/jp/refrain.ja.html?aid=2429684&dist=0&group_adults=2&keep_landing=1&no_rooms=1&sb_price_type=total&type=total",
};

export const hotels = [
  {
    id: "shuffle",
    name: "HOTEL SHUFFLE",
    shortName: "SHUFFLE",
    label: "Refined stay",
    theme: "shuffle",
    tone: "落ち着いた上質感",
    summary: "少し背伸びした夜に似合う、上質で落ち着いたホテル。",
    description:
      "池袋駅C1出口近く。黒とゴールドを基調にした外観と落ち着いた客室で、大人っぽい時間を過ごしたい日に選びやすいホテルです。",
    bestFor: ["記念日", "大人のデート", "落ち着いた夜"],
    image: "/images/hotel-shuffle-fv.png",
    officialUrl: "https://hotelshuffle.com/",
    bookingUrl: bookingUrls.shuffle,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=HOTEL%20SHUFFLE%20Ikebukuro",
    mapEmbedUrl: "https://www.google.com/maps?q=HOTEL%20SHUFFLE%20Ikebukuro&output=embed",
    address: {
      postalCode: "171-0014",
      streetAddress: "池袋2-16-4",
      addressLocality: "豊島区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    telephone: "03-3982-8071",
    accessText: "池袋駅西口C1出口より徒歩1分",
    seoDescription:
      "HOTEL SHUFFLEは池袋駅C1出口徒歩1分のプライベートホテルです。落ち着いた客室、Standard / Premium料金、REST / STAYの利用に対応しています。",
    priceGuide: "Standard REST ¥4,800〜 / STAY ¥9,500〜",
    priceNote: "表示料金は税込の目安です。利用時間・曜日・特別期間により変更になる場合があります。",
    pricePlans: [
      {
        name: "Standard",
        rows: [
          { label: "REST", value: "¥4,800〜" },
          { label: "STAY", value: "¥9,500〜" },
        ],
      },
      {
        name: "Premium",
        rows: [
          { label: "REST", value: "¥8,400" },
          { label: "STAY", value: "¥14,800" },
          { label: "延長", value: "¥2,000" },
        ],
      },
    ],
    rooms: [
      { src: "/images/room-505.webp", alt: "HOTEL SHUFFLE Room 505", label: "Room 505" },
      { src: "/images/room-501.webp", alt: "HOTEL SHUFFLE Room 501", label: "Room 501" },
      { src: "/images/room-202.webp", alt: "HOTEL SHUFFLE Room 202", label: "Room 202" },
      { src: "/images/room-401.webp", alt: "HOTEL SHUFFLE Room 401", label: "Room 401" },
    ],
    scenes: [
      { src: "/images/stay-shuffle-01.png", alt: "HOTEL SHUFFLEでくつろぐ滞在イメージ", label: "Couple stay" },
      { src: "/images/stay-shuffle-02.png", alt: "HOTEL SHUFFLEの上質な客室滞在イメージ", label: "Relax time" },
      { src: "/images/stay-shuffle-03.png", alt: "HOTEL SHUFFLEで過ごす夜の滞在イメージ", label: "Night stay" },
      { src: "/images/stay-shuffle-04.png", alt: "HOTEL SHUFFLEの落ち着いた滞在イメージ", label: "Calm mood" },
      { src: "/images/stay-shuffle-05.png", alt: "HOTEL SHUFFLEの客室で過ごす滞在イメージ", label: "Room scene" },
    ],
    points: ["池袋駅C1出口近く", "黒金トーンのラグジュアリー感", "写真で雰囲気を確認しやすい"],
  },
  {
    id: "refrain",
    name: "HOTEL REFRAIN",
    shortName: "REFRAIN",
    label: "Casual stay",
    theme: "refrain",
    tone: "気軽で明るい雰囲気",
    summary: "気軽に入りやすく、会話を楽しむ日にも選びやすいホテル。",
    description:
      "池袋駅C1出口近く。やわらかな色調の客室と親しみやすい雰囲気で、肩の力を抜いて過ごしたい日に向いています。",
    bestFor: ["気軽な滞在", "友人同士", "明るい客室"],
    image: "/images/r402a_upscaled.jpg",
    officialUrl: "https://www.hotelrefrain.com/",
    bookingUrl: bookingUrls.refrain,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=HOTEL%20REFRAIN%20Ikebukuro",
    mapEmbedUrl: "https://www.google.com/maps?q=HOTEL%20REFRAIN%20Ikebukuro&output=embed",
    address: {
      postalCode: "171-0014",
      streetAddress: "池袋2丁目16-5",
      addressLocality: "豊島区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    telephone: "03-5950-2717",
    accessText: "池袋駅C1出口より徒歩約1分",
    seoDescription:
      "HOTEL REFRAINは池袋駅C1出口徒歩約1分のデザイナーズホテルです。明るく入りやすい客室、REST ¥4,500〜 / STAY ¥9,800〜の料金目安を掲載しています。",
    priceGuide: "REST ¥4,500〜 / STAY ¥9,800〜",
    priceNote: "料金はお部屋タイプ・曜日・時間帯により異なります。",
    pricePlans: [
      {
        name: "Basic",
        rows: [
          { label: "REST 2時間〜", value: "¥4,500〜" },
          { label: "STAY 1泊", value: "¥9,800〜" },
        ],
      },
    ],
    rooms: [
      { src: "/images/r402a_upscaled.jpg", alt: "HOTEL REFRAIN Room 402", label: "Room 402" },
      { src: "/images/r507a_upscaled.jpg", alt: "HOTEL REFRAIN Room 507", label: "Room 507" },
      { src: "/images/r301a_upscaled.jpg", alt: "HOTEL REFRAIN Room 301", label: "Room 301" },
      { src: "/images/r302a_upscaled.jpg", alt: "HOTEL REFRAIN Room 302", label: "Room 302" },
    ],
    scenes: [
      { src: "/images/stay-refrain-01.png", alt: "HOTEL REFRAINで友人と楽しむ滞在イメージ", label: "Friends stay" },
      { src: "/images/stay-refrain-02.png", alt: "HOTEL REFRAINでくつろぐ滞在イメージ", label: "Bright room" },
      { src: "/images/stay-refrain-03.png", alt: "HOTEL REFRAINの明るい客室滞在イメージ", label: "Casual mood" },
      { src: "/images/stay-refrain-04.png", alt: "HOTEL REFRAINの会話を楽しむ滞在イメージ", label: "Light stay" },
    ],
    points: ["池袋駅C1出口近く", "明るく入りやすい雰囲気", "カジュアルな滞在に合わせやすい"],
  },
];

export const gridTiles = [
  {
    id: "hero",
    kind: "intro",
    label: "",
    title: "池袋のホテルを、気分で選ぶ。",
    text: "SHUFFLEとREFRAINを、雰囲気・客室・予約導線まで一画面で比べられる統合サイトです。",
  },
  {
    id: "shuffle",
    kind: "hotel",
    hotelId: "shuffle",
  },
  {
    id: "refrain",
    kind: "hotel",
    hotelId: "refrain",
  },
  {
    id: "mood",
    kind: "compare",
    label: "Mood",
    title: "上質か、気軽か。",
    text: "落ち着いたSHUFFLE、明るく入りやすいREFRAIN。今日の気分に合わせて選べます。",
  },
  {
    id: "stay",
    kind: "photo",
    label: "Stay Scene",
    title: "滞在シーンを見る",
    src: "/images/stay-shuffle-01.png",
    alt: "HOTEL SHUFFLEの滞在シーン",
  },
  {
    id: "price-summary",
    kind: "price",
    label: "Price",
    title: "",
    text: "REST / STAY の目安を先に見て、詳しい料金表へ進めます。",
  },
  {
    id: "booking-shuffle",
    kind: "booking",
    hotelId: "shuffle",
  },
  {
    id: "faq",
    kind: "faq",
    label: "Before Booking",
    title: "予約前に確認",
    text: "空室・料金・詳細条件は各予約ページで確認できます。",
  },
  {
    id: "booking-refrain",
    kind: "booking",
    hotelId: "refrain",
  },
];

export const faqs = [
  {
    question: "どこから予約できますか？",
    answer: "各ホテルの空室確認ボタンから、予約ページへ移動できます。",
  },
  {
    question: "駅から近いですか？",
    answer: "どちらも池袋駅C1出口近くで、移動しやすい立地です。",
  },
  {
    question: "どちらを選べばいいですか？",
    answer: "上質な雰囲気ならSHUFFLE、気軽で明るい雰囲気ならREFRAINがおすすめです。",
  },
];
