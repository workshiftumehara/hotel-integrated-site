const dayUseOff = 500;
const stayOff = 1000;
const monthLabel = "10月";

function yen(amount) {
  return amount.toLocaleString("ja-JP");
}

/**
 * 月次のLINEクーポン。金額と月だけ変えれば、表示文言はここから揃う。
 * 公式サイト（2026-10-01）: デイユース500円OFF / 宿泊1,000円OFF。
 * 平日・週末・祝日を問わず、10月中は何回でも。フロント提示。
 */
export const lineCoupon = {
  monthKey: "2026-10",
  monthLabel,
  dayUseOff,
  stayOff,
  url:
    process.env.NEXT_PUBLIC_LINE_URL ||
    "https://line.shuffle-refrain.com/r/official-site",
  ctaLabel: `LINE友だち追加でデイユース${yen(dayUseOff)}円OFF・宿泊${yen(stayOff)}円OFF`,
  shortLabel: `LINE友だち追加で${yen(dayUseOff)}円OFF`,
  popupTitle: `${monthLabel}限定のLINEクーポン`,
  popupDescription: `友だち追加で、デイユース${yen(dayUseOff)}円OFF・宿泊${yen(stayOff)}円OFF。HOTEL SHUFFLE・HOTEL REFRAINで、${monthLabel}中は平日・週末・祝日を問わず何回でもご利用いただけます。`,
  note: "公式LINEでクーポンを受け取り、ご利用時にフロントでご提示ください。",
};
