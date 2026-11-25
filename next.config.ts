import type { NextConfig } from "next";

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: security },
      // Hashed build assets are already immutable. Public files are not hashed, so they revalidate daily
      // and a replaced CV or image appears within a day even without a redeploy of the cache layer.
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
      { source: "/cv/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
