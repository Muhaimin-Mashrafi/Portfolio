import type { Metadata } from "next";
import { profile } from "@/data/profile";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteDescription =
  "Portfolio of Abdullah Al Muhaimin — AI / Machine Learning Engineer, undergraduate researcher and Python developer at United International University.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.headline}`,
    description: siteDescription,
  },
};
