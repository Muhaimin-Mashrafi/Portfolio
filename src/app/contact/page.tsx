import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "Contact", robots: { index: false } };

export default function Page() {
  return <PlaceholderPage title="Contact" label="Coming soon" />;
}
