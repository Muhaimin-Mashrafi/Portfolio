/**
 * Prefix for files served from /public when the site lives under a sub-path (GitHub Pages project sites,
 * e.g. /Portfolio). Empty on Vercel, locally and on a user/custom-domain site. Set via BASE_PATH at build time.
 * next/link adds the prefix by itself; plain <a href> and <img src> to /public files need this helper.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
