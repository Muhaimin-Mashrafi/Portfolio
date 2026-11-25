import { skillsSchema } from "@/types/skills";

/**
 * Verified skills only. To add a skill, put it in the matching category's `items`.
 * Categories with no items are hidden automatically. No percentages or progress bars.
 */
export const skills = skillsSchema.parse([
  { id: "programming", title: "Programming", items: [{ name: "Python", level: "Advanced" }] },
  { id: "machine-learning", title: "Machine Learning", items: [{ name: "Model training" }, { name: "Model evaluation" }] },
  { id: "deep-learning", title: "Deep Learning", items: [] },
  { id: "generative-ai", title: "Generative AI", items: [] },
  { id: "nlp", title: "Natural Language Processing", items: [] },
  { id: "computer-vision", title: "Computer Vision", items: [] },
  { id: "frameworks", title: "Frameworks", items: [] },
  { id: "libraries", title: "Libraries", items: [] },
  {
    id: "tools",
    title: "Development Tools",
    items: [{ name: "Visual Studio Code" }, { name: "Git" }, { name: "GitHub" }],
  },
  { id: "cloud", title: "Cloud and Deployment", items: [] },
]);
