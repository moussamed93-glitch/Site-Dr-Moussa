import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'C:/Users/jaste/OneDrive/Bureau/Site moussa';
const OUT = path.resolve('src/assets/images');

const JOBS = [
  // [source, destination, largeur max]
  ['Photos general/IMG_2070.jpg', 'medecin-cabinet.jpg', 2000],
  ['Photos general/IMG_9364.jpg', 'medecin-portrait.jpg', 1400],
  ['Photos general/IMG_2116.jpg', 'medecin-examen.jpg', 1400],
  ['Photos general/IMG_9320.jpg', 'accueil-logo.jpg', 1800],
  ['Photos general/IMG_9334.jpg', 'accueil-angle.jpg', 1400],
  ['Photos general/IMG_9351.jpg', 'salle-attente.jpg', 1400],
  ['Photos general/IMG_9325.jpg', 'cabinet-1.jpg', 1400],
  ['Photos general/IMG_9352.jpg', 'cabinet-2.jpg', 1400],
  ['Photos general/IMG_9358.jpg', 'cabinet-3.jpg', 1400],
  ['Photos general/IMG_9360.jpg', 'cabinet-4.jpg', 1400],
  ['Photos general/IMG_9378.jpg', 'cabinet-5.jpg', 1400],
  ['Photos general/Photo sans cables.png', 'materiel-vue.jpg', 1800],
  ['Photos general/Photo matériels sans cable.png', 'materiel-ensemble.jpg', 1800],
  ['participationcongrsbloc/IMG_3151.jpeg', 'congres-sto-2025.jpg', 1600],
  ['participationcongrsbloc/ab955cd9-6d43-487d-a757-e9071c48ef81.JPG', 'congres-sto-panel.jpg', 1600],
  ['participationcongrsbloc/IMG_0558.JPG', 'congres-epomec.jpg', 1600],
  ['participationcongrsbloc/IMG_0104.jpeg', 'congres-amos.jpg', 1600],
  ['participationcongrsbloc/IMG_4602.JPG', 'bloc-1.jpg', 1600],
  ['participationcongrsbloc/IMG_6892.jpeg', 'bloc-2.jpg', 1600],
  ['participationcongrsbloc/IMG_8360.JPG', 'bloc-3.jpg', 1600],
  ['participationcongrsbloc/IMG_6900.jpeg', 'bloc-4.jpg', 1600],
];

await mkdir(OUT, { recursive: true });

for (const [src, dest, width] of JOBS) {
  const input = path.join(SRC, src);
  const output = path.join(OUT, dest);
  try {
    const img = sharp(input, { limitInputPixels: 1e9 }).rotate();
    const meta = await img.metadata();
    await img
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(output);
    console.log(`OK  ${dest}  (${meta.width}x${meta.height} -> max ${width}w)`);
  } catch (e) {
    console.error(`ERREUR  ${src}: ${e.message}`);
  }
}
console.log('Terminé.');
