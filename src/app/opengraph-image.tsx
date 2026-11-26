import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Static social card generated at build time (original, text only). */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#0B0D0F", color: "#E8E8E8", padding: 80, borderLeft: "8px solid #C1121F" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#92979D", textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>{profile.name}</div>
        <div style={{ fontSize: 34, marginTop: 20, color: "#92979D" }}>{profile.headline}</div>
        <div style={{ fontSize: 26, marginTop: 40, color: "#C1121F" }}>United International University</div>
      </div>
    ),
    size,
  );
}
