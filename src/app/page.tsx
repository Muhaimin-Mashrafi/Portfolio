import { Hero } from "@/components/hero/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ResearchPreview } from "@/components/research/ResearchPreview";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { AcademicSection } from "@/components/home/AcademicSection";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { isCvAvailable } from "@/lib/cv";

export default function HomePage() {
  return (
    <>
      <Hero cvAvailable={isCvAvailable()} />
      <AboutPreview />
      <FeaturedProjects />
      <ResearchPreview />
      <SkillsPreview />
      <AcademicSection />
      <AchievementsPreview />
      <ContactSection />
    </>
  );
}
