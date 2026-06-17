import { redirect } from "next/navigation";

export const metadata = {
  title: "Hotel Compare 3x3 | Archive",
};

export default function ThreeByThreeArchivePage() {
  redirect("/archive/3x3-grid/index.html");
}
