import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { research } from "@/data/research";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { AcademicBackground } from "@/components/education/AcademicBackground";

export const metadata: Metadata = {
  title: "About",
  description: "About Abdullah Al Muhaimin — AI and machine learning enthusiast, undergraduate researcher and Python developer at United International University.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const [first, ...rest] = profile.about;
  return (
    <>
      <PageHeader label="About" title="Building intelligent systems, and questioning them." />
      <Section label="Introduction">
        <div className="max-w-2xl space-y-6 leading-relaxed text-fg/90">
          <p className="text-xl leading-relaxed text-fg">{first}</p>
          {rest.map((p) => <p key={p} className="text-lg">{p}</p>)}
        </div>
      </Section>
      <Section label="Education"><AcademicBackground /></Section>
      <Section label="Technical background">
        <ul className="max-w-2xl divide-y divide-line border-y border-line">
          {profile.technicalBackground.map((t) => (
            <li key={t} className="flex gap-4 py-3.5 text-fg/90">
              <span className="mt-2.5 size-1.5 shrink-0 bg-accent" aria-hidden="true" />{t}
            </li>
          ))}
        </ul>
        <div className="mt-6"><TextLink href="/skills">Skills in detail</TextLink></div>
      </Section>
      <Section label="Areas of interest"><TagList items={profile.interests} label="Areas of interest" /></Section>
      <Section label="Development philosophy">
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
          {profile.philosophy.map((p, i) => (
            <li key={p.title} className="bg-bg p-6">
              <p className="font-mono text-xs text-accent-text">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-4 font-heading text-xl font-medium">{p.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section label="Research involvement">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{research.status}</p>
          <p className="mt-4 font-heading text-2xl font-medium leading-snug tracking-[-0.01em]">{research.title}</p>
          <p className="mt-4 leading-relaxed text-muted">{research.overview}</p>
          <div className="mt-4"><TextLink href="/research">Research details</TextLink></div>
        </div>
      </Section>
      <Section label="Professional goals" border={false}>
        <ul className="max-w-2xl divide-y divide-line border-y border-line">
          {profile.goals.map((g) => <li key={g} className="py-3.5 text-fg/90">{g}</li>)}
        </ul>
      </Section>
    </>
  );
}
