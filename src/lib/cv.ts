import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

/**
 * Runs on the server at build time. The CV is only linked when the PDF exists
 * in /public, so a missing file never produces a broken download.
 */
export function isCvAvailable(): boolean {
  const relative = profile.cv.publicPath.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}
