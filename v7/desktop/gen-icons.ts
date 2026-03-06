import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg: Buffer = readFileSync('icon.svg');

// Generate PNG icons at various sizes
const sizes: number[] = [16, 32, 48, 64, 128, 256, 512, 1024];
for (const size of sizes) {
  await sharp(svg).resize(size, size).png().toFile(`app/icon-${size}.png`);
}

// Main icon
await sharp(svg).resize(512, 512).png().toFile('app/icon.png');

// macOS .icns needs 1024px PNG (electron-builder converts it)
await sharp(svg).resize(1024, 1024).png().toFile('icon.png');

console.log('Icons generated.');
