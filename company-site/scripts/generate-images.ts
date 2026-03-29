/**
 * Generate hero images for Grounded Web Design company site.
 * Uses Nano Banana / Google Gemini Imagen 4.
 *
 * Usage: GEMINI_API_KEY=your_key npx tsx scripts/generate-images.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY is required. Get it at https://aistudio.google.com/apikey");
  process.exit(1);
}

const IMAGES = [
  {
    id: "hero",
    name: "Hero Background",
    prompt:
      "Abstract premium web design workspace. Multiple ultrawide monitors displaying beautiful websites, dark ambient lighting, minimalist desk with subtle purple-indigo glow. High-end creative agency atmosphere. Ultra-wide cinematic composition, photorealistic.",
    aspectRatio: "16:9",
  },
];

interface ImagenResponse {
  predictions: Array<{ bytesBase64Encoded: string; mimeType: string }>;
}

async function generateImage(prompt: string, aspectRatio: string): Promise<Buffer> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio, safetyFilterLevel: "block_only_high" },
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Imagen API error ${response.status}: ${err}`);
  }
  const data = (await response.json()) as ImagenResponse;
  return Buffer.from(data.predictions[0].bytesBase64Encoded, "base64");
}

async function main() {
  console.log("✨ Generating images for Grounded Web Design...\n");
  const imagesDir = join(process.cwd(), "public", "images");
  if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true });

  const results: Record<string, string> = {};
  for (const img of IMAGES) {
    console.log(`Generating: ${img.name}`);
    try {
      const buffer = await generateImage(img.prompt, img.aspectRatio);
      const filename = `${img.id}.jpg`;
      writeFileSync(join(imagesDir, filename), buffer);
      results[img.id] = `/images/${filename}`;
      console.log(`  ✅ Saved: public/images/${filename}\n`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err}\n`);
    }
  }
  writeFileSync(join(process.cwd(), "public", "images.json"), JSON.stringify(results, null, 2));
  console.log("✅ Done. Run npm run build to rebuild the site.");
}

main().catch(console.error);
