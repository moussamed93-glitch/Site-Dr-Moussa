import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'public/partners';
await mkdir(OUT, { recursive: true });

// CNAM: fond blanc plat -> transparence par seuillage (chroma-key blanc)
async function whiteToTransparent(input, output, threshold = 240) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    }
  }
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

await whiteToTransparent('scripts/tmp-logos/cnam.jpg', `${OUT}/cnam.png`, 235);

await sharp('scripts/tmp-logos/bridges.png')
  .resize({ height: 160, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/bridges.png`);

await sharp('scripts/tmp-logos/tunihealth.png')
  .resize({ height: 160, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/tunihealth.png`);

// SVG conservé tel quel (vectoriel)
import { copyFile } from 'node:fs/promises';
await copyFile('scripts/tmp-logos/isante.svg', `${OUT}/isante.svg`);

console.log('Logos traités dans', OUT);
