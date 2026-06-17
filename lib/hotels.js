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
    rooms: [
      { src: "/images/room-505.webp", alt: "HOTEL SHUFFLE Room 505", label: "Room 505" },
      { src: "/images/room-501.webp", alt: "HOTEL SHUFFLE Room 501", label: "Room 501" },
      { src: "/images/room-202.webp", alt: "HOTEL SHUFFLE Room 202", label: "Room 202" },
      { src: "/images/room-401.webp", alt: "HOTEL SHUFFLE Room 401", label: "Room 401" },
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
    rooms: [
      { src: "/images/r402a_upscaled.jpg", alt: "HOTEL REFRAIN Room 402", label: "Room 402" },
      { src: "/images/r507a_upscaled.jpg", alt: "HOTEL REFRAIN Room 507", label: "Room 507" },
      { src: "/images/r301a_upscaled.jpg", alt: "HOTEL REFRAIN Room 301", label: "Room 301" },
      { src: "/images/r302a_upscaled.jpg", alt: "HOTEL REFRAIN Room 302", label: "Room 302" },
    ],
    points: ["池袋駅C1出口近く", "明るく入りやすい雰囲気", "カジュアルな滞在に合わせやすい"],
  },
];

export const gridTiles = [
  {
    id: "hero",
    kind: "intro",
    label: "Hotel Bento",
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
    id: "photo",
    kind: "photo",
    label: "Rooms",
    title: "写真で空気感を見る",
    src: "/images/room-505.webp",
    alt: "HOTEL SHUFFLEの客室",
  },
  {
    id: "access",
    kind: "compare",
    label: "Access",
    title: "どちらも池袋駅C1出口近く。",
    text: "アクセスの使いやすさは共通。迷ったら、滞在のムードで選べます。",
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
