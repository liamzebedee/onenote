import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg: Buffer = readFileSync('assets/icon.svg');

// Generate PNG icons at various sizes
const sizes: number[] = [16, 32, 48, 64, 128, 256, 512, 1024];
for (const size of sizes) {
  await sharp(svg).resize(size, size).png().toFile(`assets/icon-${size}.png`);
}

// Main icon for electron-builder
await sharp(svg).resize(1024, 1024).png().toFile('assets/icon.png');

console.log('Icons generated.');
