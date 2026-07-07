import sharp from 'sharp';

const SRC = 'scripts/icon-trimmed2.png';
const OUT_DARK = 'src/assets/images/brand-icon.png';
const OUT_LIGHT = 'src/assets/images/brand-icon-light.png';

const NAVY = [27, 39, 69]; // --navy-800
const CREAM = [246, 244, 238];
const TAUPE_LIGHT = [214, 206, 193]; // --taupe-300 (léger éclaircissement)

function isNavyPixel(r, g, b, a) {
  return a > 0 && b > 60 && b < 170 && r < 70 && g < 80 && b - r > 25;
}

async function run() {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const n = width * height;

  // Flood fill depuis les bords pour distinguer fond extérieur des trous enfermés (le M).
  const visited = new Uint8Array(n);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const idx = p * channels;
    if (data[idx + 3] !== 0) return; // pas transparent -> pas du fond
    visited[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Construit la variante claire (fond sombre) : cercle -> crème, trous internes (M) -> marine, arc -> taupe clair.
  const light = Buffer.from(data);
  for (let p = 0; p < n; p++) {
    const idx = p * channels;
    const a = light[idx + 3];
    if (a === 0) {
      if (!visited[p]) {
        // trou enfermé (le M) -> remplir en marine opaque
        light[idx] = NAVY[0];
        light[idx + 1] = NAVY[1];
        light[idx + 2] = NAVY[2];
        light[idx + 3] = 255;
      }
      continue; // fond extérieur reste transparent
    }
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    if (isNavyPixel(r, g, b, a)) {
      light[idx] = CREAM[0];
      light[idx + 1] = CREAM[1];
      light[idx + 2] = CREAM[2];
    } else {
      light[idx] = TAUPE_LIGHT[0];
      light[idx + 1] = TAUPE_LIGHT[1];
      light[idx + 2] = TAUPE_LIGHT[2];
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .resize({ width: 480 })
    .png({ compressionLevel: 9 })
    .toFile(OUT_DARK);

  await sharp(light, { raw: { width, height, channels } })
    .resize({ width: 480 })
    .png({ compressionLevel: 9 })
    .toFile(OUT_LIGHT);

  console.log('OK', OUT_DARK, OUT_LIGHT);
}

run();
