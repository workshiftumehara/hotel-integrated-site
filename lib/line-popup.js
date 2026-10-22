const commonLineUrl =
  process.env.NEXT_PUBLIC_LINE_URL || "https://line.shuffle-refrain.com/";
const globallyDisabled = process.env.NEXT_PUBLIC_LINE_POPUP_ENABLED === "false";

const baseConfig = {
  popupName: "line_coupon",
  destinationKind: "line_landing",
  title: "公式LINEで、限定情報とクーポンを。",
  description: "友だち追加後、LINE内の案内に沿ってクーポンを受け取れます。",
  note: "クーポンの利用条件は、LINE内の案内をご確認ください。",
};

export const LINE_POPUP_DELAY_MS = 25_000;
export const LINE_POPUP_ENGAGEMENT_DELAY_MS = 10_000;
export const LINE_POPUP_SCROLL_THRESHOLD = 40;
export const LINE_POPUP_SUPPRESSION_MS = 14 * 24 * 60 * 60 * 1000;

export const linePopupConfigs = {
  integrated: {
    ...baseConfig,
    siteId: "integrated",
    brand: "SHUFFLE / REFRAIN",
    enabled: process.env.NEXT_PUBLIC_INTEGRATED_LINE_POPUP_ENABLED !== "false",
    lineUrl:
      process.env.NEXT_PUBLIC_INTEGRATED_LINE_URL || commonLineUrl,
  },
  shuffle: {
    ...baseConfig,
    siteId: "shuffle",
    brand: "HOTEL SHUFFLE",
    enabled: process.env.NEXT_PUBLIC_SHUFFLE_LINE_POPUP_ENABLED !== "false",
    lineUrl: process.env.NEXT_PUBLIC_SHUFFLE_LINE_URL || commonLineUrl,
  },
  refrain: {
    ...baseConfig,
    siteId: "refrain",
    brand: "HOTEL REFRAIN",
    enabled: process.env.NEXT_PUBLIC_REFRAIN_LINE_POPUP_ENABLED !== "false",
    lineUrl: process.env.NEXT_PUBLIC_REFRAIN_LINE_URL || commonLineUrl,
  },
};

export function getLinePopupConfig(siteId = "integrated") {
  const config = linePopupConfigs[siteId] || linePopupConfigs.integrated;

  return {
    ...config,
    enabled: !globallyDisabled && config.enabled && Boolean(config.lineUrl),
  };
}
