import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface AnimationUrls {
  hero?: string;
  dashboard?: string;
  ai_brain?: string;
  [key: string]: string | undefined;
}

export function getAnimationUrls(): AnimationUrls {
  const filePath = join(process.cwd(), "public", "animations.json");
  if (!existsSync(filePath)) return {};
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}
