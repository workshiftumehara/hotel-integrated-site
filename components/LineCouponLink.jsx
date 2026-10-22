import { lineCoupon } from "@/lib/line-coupon";

const labels = {
  button: lineCoupon.ctaLabel,
  text: lineCoupon.shortLabel,
  sticky: lineCoupon.ctaLabel,
};

export default function LineCouponLink({ hotel = "both", variant = "button", className = "" }) {
  const classes = [
    "line-coupon-link",
    `is-${variant}`,
    variant === "button" ? "btn line" : "",
    variant === "text" ? "text-link" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={classes}
      href={lineCoupon.url}
      target="_blank"
      rel="noreferrer"
      data-hotel={hotel}
      data-analytics-event="line_click"
    >
      {labels[variant] || lineCoupon.ctaLabel}
      {variant === "sticky" ? null : (
        <span aria-hidden="true" className="arrow">
          →
        </span>
      )}
    </a>
  );
}
