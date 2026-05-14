import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = path.resolve('./public/images/products');

// Products the client flagged for copyright colour adjustment
// OA Knee Support, Elastic Knee Support, Functional Knee Support + all Pediatric (EM) images
const productsToModify = [
  'EF-12', // Elastic Knee Support
  'EF-13', // Functional Knee Support
  'EF-14', // OA Knee Support
  'EM-01', // Pediatric Soft Collar
  'EM-02', // Pediatric Philadelphia Collar
  'EM-03', // Pediatric Arm Sling Tropical
  'EM-04', // Pediatric Shoulder Immobilizer
  'EM-05', // Pediatric Clavicle Brace
  'EM-06', // Pediatric Arm Sling Baggy
  'EM-07', // Pediatric Knee Immobilizer
  'EM-08', // Pediatric Walker With Wheel
  'EM-09', // Pediatric Walker Without Wheel
];

async function processImages() {
  console.log('Applying copyright-safe colour adjustments...\n');
  for (const code of productsToModify) {
    const filePath = path.join(imgDir, `${code}.jpg`);
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP – file not found: ${code}.jpg`);
      continue;
    }
    try {
      const buffer = fs.readFileSync(filePath);
      // Slight hue rotation + brightness/saturation tweak – visually indistinguishable
      // but creates a different pixel fingerprint, avoiding direct copyright match
      const processed = await sharp(buffer)
        .modulate({ brightness: 1.04, saturation: 0.92, hue: 8 })
        .jpeg({ quality: 90 })
        .toBuffer();
      fs.writeFileSync(filePath, processed);
      console.log(`  OK  – ${code}.jpg`);
    } catch (err) {
      console.error(`  ERR – ${code}.jpg:`, err.message);
    }
  }
  console.log('\nDone.');
}

processImages();
