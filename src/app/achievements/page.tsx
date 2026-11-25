import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = { title: "Achievements", robots: { index: false } };

export default function Page() {
  return <PlaceholderPage title="Achievements" label="Coming soon" />;
}
