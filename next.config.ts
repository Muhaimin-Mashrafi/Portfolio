import type { NextConfig } from "next";

/**
 * Two deployment modes:
 *  - default (Vercel / local): normal Next.js output with security and cache headers.
 *  - GitHub Pages: set STATIC_EXPORT=1 (and BASE_PATH=/<repo> for a project site). Produces plain files in `out/`.
 *    GitHub Pages cannot send custom HTTP headers, so those are skipped in this mode.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(staticExport
    ? { output: "export", trailingSlash: true, basePath, images: { unoptimized: true } }
    : {
        async headers() {
          return [
            { source: "/:path*", headers: security },
            { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
            { source: "/cv/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
          ];
        },
      }),
};

export default nextConfig;
