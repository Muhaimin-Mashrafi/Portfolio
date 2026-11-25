import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

export function AboutPreview() {
  return (
    <Section id="about" label="About">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-fg/90">
        {profile.about.slice(0, 2).map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-6"><TextLink href="/about">Read more</TextLink></div>
    </Section>
  );
}
