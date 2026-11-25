import raw from "@/data/achievements.json";
import { achievementsFileSchema, type Achievement } from "@/types/achievement";

const all = achievementsFileSchema.parse(raw);

/** Visible achievements, newest first. */
export function getAchievements(): Achievement[] {
  return all
    .filter((a) => a.visibility === "public")
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
