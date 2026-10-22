export const bookingUrls = {
  shuffle: "https://www.booking.com/hotel/jp/shuffle.ja.html",
  refrain:
    "https://www.booking.com/hotel/jp/refrain.ja.html?aid=2429684&dist=0&group_adults=2&keep_landing=1&no_rooms=1&sb_price_type=total&type=total",
};

export const stayPolicy =
  "宿泊の通常チェックアウトは12:00です。午前1時以降の入室は、入室から12時間の滞在を保証します。チェックイン時刻そのものはプランや利用時間帯で異なります。";

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
      "池袋駅西口C1出口から徒歩1分。黒とゴールドを基調にした外観と落ち着いた客室で、大人っぽい時間を過ごしたい日に選びやすいホテルです。",
    bestFor: ["記念日", "大人のデート", "落ち着いた夜"],
    image: "/images/hotel-shuffle-fv.jpg",
    officialUrl: "https://hotelshuffle.com/",
    priceUrl: "https://hotelshuffle.com/price",
    bookingUrl: bookingUrls.shuffle,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=HOTEL+SHUFFLE+%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%B1%8A%E5%B3%B6%E5%8C%BA%E6%B1%A0%E8%A2%8B2-16-4",
    mapEmbedUrl: "https://www.google.com/maps?q=HOTEL%20SHUFFLE%20Ikebukuro&output=embed",
    address: {
      postalCode: "171-0014",
      streetAddress: "池袋2-16-4",
      addressLocality: "豊島区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    // 公式サイト sameAs の Google マップ（maps.app.goo.gl/CZncKLMhNKH8iozK6）掲載座標。2026-10-22確認。
    geo: { latitude: 35.7329301, longitude: 139.7063515 },
    telephone: "03-3982-8071",
    accessText: "池袋駅西口C1出口より徒歩1分",
    checkoutTime: "12:00",
    pageTitle: "HOTEL SHUFFLE｜池袋駅C1出口徒歩1分",
    seoDescription:
      "HOTEL SHUFFLEは池袋駅西口C1出口徒歩1分のプライベートホテルです。RESTは平日4,800円〜・土日祝5,300円〜、STAYは日〜木7,900円〜。通常チェックアウトは12:00、午前1時以降の入室は12時間保証です。",
    priceRange: "REST 平日¥4,800〜 / STAY 日〜木¥7,900〜",
    priceGuide: "REST 平日¥4,800〜 / STAY 日〜木¥7,900〜",
    priceNote:
      "2026-10-01更新の公式料金表に基づく税込の目安です。客室タイプ・特別期間・当日の運用で変わる場合があります。",
    pricePlans: [
      {
        name: "REST",
        rows: [
          { label: "平日", value: "¥4,800〜" },
          { label: "土日祝", value: "¥5,300〜" },
        ],
      },
      {
        name: "STAY",
        rows: [
          { label: "日〜木", value: "¥7,900〜" },
          { label: "金曜", value: "¥10,500〜" },
          { label: "土・祝前日", value: "¥12,500〜" },
        ],
      },
      {
        name: "Premium",
        compact: true,
        rows: [
          { label: "REST 平日", value: "¥8,400" },
          { label: "REST 土日祝", value: "¥8,900" },
          { label: "STAY 日〜木", value: "¥14,800" },
          { label: "STAY 金", value: "¥15,800" },
          { label: "STAY 土・祝前日", value: "¥17,800" },
          { label: "延長 30分", value: "¥2,000" },
        ],
      },
      {
        name: "延長",
        compact: true,
        rows: [{ label: "Value〜Standard 30分", value: "¥1,500" }],
      },
    ],
    priceTiers: [
      {
        name: "Value",
        rooms: "ROOM 101",
        restWeekday: "¥4,800",
        restWeekend: "¥5,300",
        staySunThu: "¥7,900",
        stayFriday: "¥10,500",
        staySaturday: "¥12,500",
        extension: "¥1,500 / 30分",
      },
      {
        name: "Standard A",
        rooms: "102・201・301・401・501",
        restWeekday: "¥5,500",
        restWeekend: "¥6,000",
        staySunThu: "¥9,500",
        stayFriday: "¥10,500",
        staySaturday: "¥12,500",
        extension: "¥1,500 / 30分",
      },
      {
        name: "Standard B",
        rooms: "103・202・205・302・305・402・405・502",
        restWeekday: "¥5,800",
        restWeekend: "¥6,300",
        staySunThu: "¥9,800",
        stayFriday: "¥10,800",
        staySaturday: "¥12,800",
        extension: "¥1,500 / 30分",
      },
      {
        name: "Standard C",
        rooms: "203・206・303・306・403・406・503",
        restWeekday: "¥6,300",
        restWeekend: "¥6,800",
        staySunThu: "¥10,500",
        stayFriday: "¥11,500",
        staySaturday: "¥13,500",
        extension: "¥1,500 / 30分",
      },
      {
        name: "Premium",
        rooms: "ROOM 505",
        restWeekday: "¥8,400",
        restWeekend: "¥8,900",
        staySunThu: "¥14,800",
        stayFriday: "¥15,800",
        staySaturday: "¥17,800",
        extension: "¥2,000 / 30分",
      },
    ],
    amenities: ["客室", "バス", "無料Wi-Fi", "大型テレビ", "アメニティ"],
    parking:
      "ホテル前にコインパーキングがあります。台数に限りがあるため、お車でお越しの際は事前にご確認ください。",
    occupancy: "1室を同時に利用できるのは2名までです。3名以上は2室以上に分かれてご利用ください。",
    goingOut: "外出は自由です。お出かけの際はフロントへお声がけください。",
    rooms: [
      { src: "/images/room-505.webp", alt: "HOTEL SHUFFLE Room 505", label: "Room 505" },
      { src: "/images/room-501.webp", alt: "HOTEL SHUFFLE Room 501", label: "Room 501" },
      { src: "/images/room-202.webp", alt: "HOTEL SHUFFLE Room 202", label: "Room 202" },
      { src: "/images/room-401.webp", alt: "HOTEL SHUFFLE Room 401", label: "Room 401" },
    ],
    scenes: [
      { src: "/images/stay-shuffle-01.jpg", alt: "HOTEL SHUFFLEでくつろぐ滞在イメージ", label: "Couple stay" },
      { src: "/images/stay-shuffle-02.jpg", alt: "HOTEL SHUFFLEの上質な客室滞在イメージ", label: "Relax time" },
      { src: "/images/stay-shuffle-03.jpg", alt: "HOTEL SHUFFLEで過ごす夜の滞在イメージ", label: "Night stay" },
      { src: "/images/stay-shuffle-04.jpg", alt: "HOTEL SHUFFLEの落ち着いた滞在イメージ", label: "Calm mood" },
      { src: "/images/stay-shuffle-05.jpg", alt: "HOTEL SHUFFLEの客室で過ごす滞在イメージ", label: "Room scene" },
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
      "池袋駅C1出口から徒歩約1分。やわらかな色調の客室と親しみやすい雰囲気で、肩の力を抜いて過ごしたい日に向いています。",
    bestFor: ["気軽な滞在", "友人同士", "明るい客室"],
    image: "/images/r402a_upscaled.jpg",
    officialUrl: "https://www.hotelrefrain.com/",
    priceUrl: "https://www.hotelrefrain.com/price",
    bookingUrl: bookingUrls.refrain,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%B1%8A%E5%B3%B6%E5%8C%BA%E6%B1%A0%E8%A2%8B2%E4%B8%81%E7%9B%AE16-5",
    mapEmbedUrl: "https://www.google.com/maps?q=HOTEL%20REFRAIN%20Ikebukuro&output=embed",
    address: {
      postalCode: "171-0014",
      streetAddress: "池袋2丁目16-5",
      addressLocality: "豊島区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    // 公式サイト JSON-LD の geo。2026-10-22確認。
    geo: { latitude: 35.7335, longitude: 139.707 },
    telephone: "03-5950-2717",
    accessText: "池袋駅C1出口より徒歩約1分",
    checkoutTime: "12:00",
    pageTitle: "HOTEL REFRAIN｜池袋駅C1出口徒歩約1分",
    seoDescription:
      "HOTEL REFRAINは池袋駅C1出口徒歩約1分のデザイナーズホテルです。RESTは2時間〜4,500円〜、STAYは1泊7,900円〜。通常チェックアウトは12:00、午前1時以降の入室は12時間保証です。",
    priceRange: "REST 2時間〜¥4,500〜 / STAY 1泊¥7,900〜",
    priceGuide: "REST 2時間〜¥4,500〜 / STAY 1泊¥7,900〜",
    priceNote:
      "公式サイトの料金目安です。客室タイプ・曜日・時間帯・空室状況により異なります。RESTは2時間〜、STAYは1泊です。",
    pricePlans: [
      {
        name: "REST",
        rows: [{ label: "2時間〜", value: "¥4,500〜" }],
      },
      {
        name: "STAY",
        rows: [{ label: "1泊", value: "¥7,900〜" }],
      },
    ],
    amenities: ["大型バスルーム", "無料Wi-Fi", "VOD", "大型テレビ", "アメニティ"],
    parking:
      "ホテル目の前にコインパーキングがあり、3台まで駐車できます。満車の場合があるため、お車でお越しの際は事前にご確認ください。",
    occupancy: "1室あたり同室利用は2名までです。3名以上は2室以上をご利用ください。",
    goingOut: "外出は自由です。お出かけの際はフロントへお声がけください。",
    rooms: [
      { src: "/images/r402a_upscaled.jpg", alt: "HOTEL REFRAIN Room 402", label: "Room 402" },
      { src: "/images/r507a_upscaled.jpg", alt: "HOTEL REFRAIN Room 507", label: "Room 507" },
      { src: "/images/r301a_upscaled.jpg", alt: "HOTEL REFRAIN Room 301", label: "Room 301" },
      { src: "/images/r302a_upscaled.jpg", alt: "HOTEL REFRAIN Room 302", label: "Room 302" },
    ],
    scenes: [
      { src: "/images/stay-refrain-01.jpg", alt: "HOTEL REFRAINで友人と楽しむ滞在イメージ", label: "Friends stay" },
      { src: "/images/stay-refrain-02.jpg", alt: "HOTEL REFRAINでくつろぐ滞在イメージ", label: "Bright room" },
      { src: "/images/stay-refrain-03.jpg", alt: "HOTEL REFRAINの明るい客室滞在イメージ", label: "Casual mood" },
      { src: "/images/stay-refrain-04.jpg", alt: "HOTEL REFRAINの会話を楽しむ滞在イメージ", label: "Light stay" },
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
    src: "/images/stay-shuffle-01.jpg",
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
    question: "デイユース（休憩）で利用できますか？",
    answer:
      "はい。HOTEL SHUFFLEのRESTは平日¥4,800〜、土日祝¥5,300〜です。最安はROOM 101で、客室タイプが上がると料金も上がります。HOTEL REFRAINのRESTは2時間〜¥4,500〜です。利用できる時間と当日の料金は、予約ページまたはお電話でご確認ください。",
  },
  {
    question: "予約はどこからできますか？",
    answer:
      "各ホテルの「空室確認」ボタンからBooking.comの掲載ページへ進めます。空室があれば予約なしでも利用できますが、混み合う時間帯は事前確認がおすすめです。",
  },
  {
    question: "支払い方法は何がありますか？",
    answer: "両ホテルともクレジットカードと現金でお支払いいただけます。",
  },
  {
    question: "女性ひとりでも利用できますか？",
    answer:
      "はい。両ホテルともおひとりで利用できます。HOTEL REFRAINは男性・女性どちらも歓迎と案内しています。短時間の休憩、身支度、仕事帰りのリフレッシュ、宿泊に利用できます。",
  },
  {
    question: "推し活や観劇・ライブの後にも利用できますか？",
    answer:
      "はい。両ホテルとも推し活や観劇・ライブ後の休憩に利用できます。1室同時利用は2名までです。写真撮影、荷物整理、着替え、感想会などで3名以上になる場合は、2室以上に分かれてご利用ください。",
  },
  {
    question: "チェックイン・チェックアウトは何時ですか？",
    answer:
      "両ホテルとも、宿泊の通常チェックアウトは12:00です。午前1時以降にご入室の場合は、入室から12時間の滞在を保証しています。HOTEL REFRAINの公式案内では、午前1時入室なら午後1時まで、午前3時入室なら午後3時までと例示されています。チェックイン時刻そのものは、プランやご利用時間帯によって異なります。",
  },
  {
    question: "HOTEL SHUFFLEとHOTEL REFRAINはどのくらい離れていますか？",
    answer:
      "2館は池袋2-16-4と池袋2丁目16-5にあり、隣接する近い立地です。どちらも池袋駅C1出口から徒歩約1分で、当日の空室や好みの客室に合わせて比較しやすい距離です。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "HOTEL SHUFFLEはホテル前にコインパーキングがあり、台数に限りがあります。HOTEL REFRAINはホテル目の前のコインパーキングで、3台まで駐車できます。満車の場合があるため、お車でお越しの際は事前にご確認ください。",
  },
  {
    question: "外出はできますか？",
    answer: "両ホテルとも外出は自由です。お出かけの際はフロントへお声がけください。",
  },
  {
    question: "同じ客室に何人まで入れますか？",
    answer:
      "両ホテルとも、1室を同時に利用できるのは2名までです。3名以上の場合は2室以上に分かれてご利用ください。必要な客室数と空室は、予約前にお電話でご確認ください。",
  },
  {
    question: "アメニティや客室設備は何がありますか？",
    answer:
      "両ホテルとも基本アメニティ、無料Wi-Fi、大型テレビ、バスルームがあります。HOTEL REFRAINの公式設備案内にはVODもあります。ショート以外のプランでは、ミネラルウォーター・お茶・コーヒーから2本を無料で選べます。必要なものが決まっている場合は、来館前に各ホテルへご確認ください。",
  },
  {
    question: "領収書は発行できますか？",
    answer:
      "領収書の発行方法は、現地決済か予約サイト決済かによって異なる場合があります。宛名や但し書きを含め、支払い前にフロントまたは予約サイトへ確認してください。",
  },
];
