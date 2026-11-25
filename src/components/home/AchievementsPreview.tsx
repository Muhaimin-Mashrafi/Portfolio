import { getAchievements } from "@/lib/achievements";
import { AchievementList } from "@/components/achievements/AchievementList";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

/** Hidden completely while there are no verified, visible achievements. */
export function AchievementsPreview() {
  const items = getAchievements();
  if (items.length === 0) return null;
  return (
    <Section id="achievements" label="Achievements">
      <AchievementList items={items.slice(0, 4)} />
      <div className="mt-8"><TextLink href="/achievements">All achievements</TextLink></div>
    </Section>
  );
}
