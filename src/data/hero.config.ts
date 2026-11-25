/**
 * Hero background image (decorative).
 *
 * Drop an image you are licensed to use at `public/images/robot-background.png`
 * (or change `src`) and rebuild. While the file does not exist, nothing is rendered —
 * no broken image, no layout change.
 *
 * Opacity values are tuned per breakpoint; adjust them visually after adding the image.
 */
export const heroBackground = {
  src: "/images/robot-background.png",
  opacity: {
    desktop: 0.12, // >= 1024px
    tablet: 0.08, // 768–1023px
    mobile: 0.03, // < 768px (set to 0 to hide completely)
  },
} as const;
