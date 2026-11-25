import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getPublicProjects } from "@/lib/projects";
import { getAchievements } from "@/lib/achievements";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = ["", "/projects", "/research", "/skills", "/about", "/contact"];
  if (getAchievements().length > 0) paths.push("/achievements"); // an empty page is noindex, so it is not listed
  paths.push(...getPublicProjects().map((p) => `/projects/${p.slug}`));
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
