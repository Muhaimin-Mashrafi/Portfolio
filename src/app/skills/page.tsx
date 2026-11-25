import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SkillGroups } from "@/components/skills/SkillGroups";

export const metadata: Metadata = {
  title: "Skills",
  description: "Verified technical skills of Abdullah Al Muhaimin.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader label="Technical skills" title="What I work with." lead="Only skills I can stand behind are listed here." />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20"><SkillGroups /></div>
    </>
  );
}
