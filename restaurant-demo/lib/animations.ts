import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface AnimationUrls {
  hero?: string;
  pasta?: string;
  wine?: string;
  [key: string]: string | undefined;
}

/**
 * Reads the generated animation URLs from public/animations.json.
 * Returns an empty object if the file doesn't exist yet.
 * Call this in Server Components to pass URLs to KlingVideo components.
 */
export function getAnimationUrls(): AnimationUrls {
  const filePath = join(process.cwd(), "public", "animations.json");
  if (!existsSync(filePath)) return {};
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}
