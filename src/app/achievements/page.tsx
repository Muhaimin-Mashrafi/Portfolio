import type { Metadata } from "next";
import { getAchievements } from "@/lib/achievements";
import { AchievementList } from "@/components/achievements/AchievementList";
import { PageHeader } from "@/components/ui/PageHeader";

export function generateMetadata(): Metadata {
  const empty = getAchievements().length === 0;
  return {
    title: "Achievements",
    description: "Certifications, research milestones and achievements of Abdullah Al Muhaimin.",
    alternates: { canonical: "/achievements" },
    robots: empty ? { index: false } : undefined, // nothing to index yet
  };
}

export default function AchievementsPage() {
  const items = getAchievements();
  return (
    <>
      <PageHeader label="Achievements" title="Milestones." lead="Only verified entries are published." />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        {items.length > 0 ? <AchievementList items={items} /> : <p className="max-w-xl text-muted">No achievements have been published yet.</p>}
      </div>
    </>
  );
}
