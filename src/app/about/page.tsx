import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "About", robots: { index: false } };

export default function Page() {
  return <PlaceholderPage title="About" label="Coming soon" />;
}
