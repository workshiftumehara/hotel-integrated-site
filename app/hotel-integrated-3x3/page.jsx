import { permanentRedirect } from "next/navigation";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HotelIntegratedThreeByThreeRedirect() {
  permanentRedirect("/");
}
