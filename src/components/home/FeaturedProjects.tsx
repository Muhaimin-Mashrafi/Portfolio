import { getFeaturedProjects } from "@/lib/projects";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  if (projects.length === 0) return null;
  return (
    <Section id="projects" label="Selected projects">
      {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
      <div className="mt-8"><TextLink href="/projects">All projects</TextLink></div>
    </Section>
  );
}
