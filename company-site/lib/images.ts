import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface ImageUrls {
  hero?: string;
  [key: string]: string | undefined;
}

export function getImageUrls(): ImageUrls {
  const filePath = join(process.cwd(), "public", "images.json");
  if (!existsSync(filePath)) return {};
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}
