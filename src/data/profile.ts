/**
 * Personal information. Edit this file to change what the site says about you.
 * Anything set to `null` is treated as "not supplied yet" and is hidden or
 * shown as an unavailable state by the UI — it is never replaced with made-up text.
 */
export const profile = {
  name: "Abdullah Al Muhaimin",
  nameLines: ["Abdullah", "Al Muhaimin"],
  headline: "AI / Machine Learning Engineer",
  affiliation: "Undergraduate Researcher · United International University",
  tagline: "Building intelligent systems. Exploring the architecture of AI.",
  university: "United International University (UIU)",

  links: {
    github: "https://github.com/Muhaimin-Mashrafi",
    linkedin: "https://www.linkedin.com/in/abdullah-al-muhaimin-a3ba37292/",
  },

  /** Professional email. Leave null until supplied; the UI hides it while null. */
  email: null as string | null,

  /** Served from /public. The file may be missing; the UI handles that. */
  cv: {
    publicPath: "/cv/Abdullah-Al-Muhaimin-CV.pdf",
    fileName: "Abdullah-Al-Muhaimin-CV.pdf",
  },

  /** Used from Phase 3 onwards (About section). */
  about: [
    "I'm Abdullah Al Muhaimin, an AI and Machine Learning enthusiast at United International University, passionate about building intelligent systems and exploring emerging technologies.",
    "With an advanced foundation in Python and hands-on experience developing projects, training machine learning models, and evaluating their performance, I enjoy turning technical ideas into practical solutions.",
    "Beyond development, I'm actively involved in collaborative research investigating data poisoning attacks against external knowledge bases of Large Language Models (LLMs) through cross-lingual queries.",
    "My broader interests include Machine Learning, Deep Learning, Generative AI, Natural Language Processing, Computer Vision, and AI Security.",
    "I believe in learning by building, questioning existing systems, and continuously pushing my technical capabilities further.",
  ],

  pillars: [
    { key: "Build", text: "I develop practical software and AI/ML projects." },
    { key: "Research", text: "I participate in collaborative research on emerging AI security problems." },
    { key: "Explore", text: "I continuously investigate and learn new AI technologies." },
  ],
} as const;
