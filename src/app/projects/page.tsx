import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "Projects", robots: { index: false } };

export default function Page() {
  return <PlaceholderPage title="Projects" label="Coming soon" />;
}
