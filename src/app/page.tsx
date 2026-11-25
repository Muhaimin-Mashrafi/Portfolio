import { Hero } from "@/components/hero/Hero";
import { ResearchPreview } from "@/components/research/ResearchPreview";
import { isCvAvailable } from "@/lib/cv";

export default function HomePage() {
  return (
    <>
      <Hero cvAvailable={isCvAvailable()} />
      <ResearchPreview />
    </>
  );
}
