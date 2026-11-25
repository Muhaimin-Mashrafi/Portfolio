import { SkillGroups, hasSkills } from "@/components/skills/SkillGroups";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

export function SkillsPreview() {
  if (!hasSkills()) return null;
  return (
    <Section id="skills" label="Technical skills">
      <SkillGroups compact />
      <div className="mt-8"><TextLink href="/skills">Skills in detail</TextLink></div>
    </Section>
  );
}
