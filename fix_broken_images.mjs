/**
 * Re-extracts broken/tiny product images from their source PDFs in img/
 * Uses brute-force JPEG/zlib extraction (same technique as process-images-brute.js)
 * Does NOT touch products.js — only replaces bad image files.
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import sharp from 'sharp';

const IMG_SRC_DIR  = './img';
const OUTPUT_DIR   = './public/images/products';

// Products with broken/too-small images → their source PDF filename in img/
const BROKEN = [
  { code: 'EA-03',  pdf: 'LUMBOSACRAL SUPPORT ECO (EA-03).pdf' },
  { code: 'EA-10',  pdf: 'CHEST BINDER (EA-10).pdf' },
  { code: 'EC-09',  pdf: 'THIGH BRACE WITH PELVIC SUPPORT (EC-09).pdf' },
  { code: 'ED-01',  pdf: 'FINGER COT SPLINT (ED-01).pdf' },
  { code: 'ED-02',  pdf: 'MALLET FINGER SPLINT (ED-02).pdf' },
  { code: 'ED-03',  pdf: 'FROG SPLINT (ED-03).pdf' },
  { code: 'ED-04',  pdf: 'FINGER EXTENSION SPLINT (ED-04).pdf' },
  { code: 'EE-14',  pdf: 'DVT STOCKINGS ABOVE KNEE (EE-13).pdf' },   // now used by EE-13
  { code: 'EG-06',  pdf: 'TENNIS ELBOW SUPPORT (EG-06).pdf' },
  { code: 'EH-05',  pdf: 'CERVICAL TRACTION KIT (EH-05).pdf' },
  { code: 'EI-06',  pdf: 'TOE SEPERATOR (EI-06).pdf' },
  { code: 'EJ-05',  pdf: 'HAND EXERCISE SPIKE BALL (EJ-05).pdf' },
  { code: 'EJ-06',  pdf: 'FINGER EXERCISER (EJ-06).pdf' },
  { code: 'EJ-10',  pdf: 'HAND EXERCISER (EJ-10).pdf' },
  { code: 'EK-05',  pdf: 'ELBOW CRUTCHES (EK-05).pdf' },
  { code: 'EK-07',  pdf: 'WALKER WITH WHEEL (EK-07).pdf' },
  { code: 'EK-09',  pdf: 'RECIPROCAL WALKER WITHOUT WHEEL (EK-09).pdf' },
  { code: 'EL-05',  pdf: 'HEATING PAD WITH CONTROLLER (EL-05).pdf' },
  // EL-19: no PDF — will use similar product (EL-18 Medial Arch Shoe) as fallback
  { code: 'EL-19',  pdf: null, fallback: 'EL-18' },
];

// Fallbacks map: if PDF extraction fails, use this existing good image
const FALLBACKS = {
  'EA-03': 'EA-02', 'EA-10': 'EA-08', 'EC-09': 'EC-07',
  'ED-01': 'ED-03', 'ED-02': 'ED-01', 'ED-03': 'ED-01',
  'ED-04': 'ED-01', 'EE-14': 'EE-13', 'EG-06': 'EG-05',
  'EH-05': 'EH-04', 'EI-06': 'EI-04', 'EJ-05': 'EJ-02',
  'EJ-06': 'EJ-02', 'EJ-10': 'EJ-11', 'EK-05': 'EK-06',
  'EK-07': 'EK-08', 'EK-09': 'EK-08', 'EL-05': 'EL-06',
  'EL-19': 'EL-18',
};

function extractBestJpegFromPdf(buffer) {
  const candidates = [];

  // Strategy 1: raw JPEG streams (FF D8 ... FF D9)
  let pos = 0;
  while ((pos = buffer.indexOf(Buffer.from([0xFF, 0xD8]), pos)) !== -1) {
    const end = buffer.indexOf(Buffer.from([0xFF, 0xD9]), pos);
    if (end !== -1) {
      const jpeg = buffer.slice(pos, end + 2);
      if (jpeg.length > 3000) candidates.push(jpeg);
    }
    pos += 2;
  }

  // Strategy 2: zlib-deflated images
  pos = 0;
  while ((pos = buffer.indexOf(Buffer.from([0x78, 0x9C]), pos)) !== -1) {
    try {
      const decompressed = zlib.inflateSync(buffer.slice(pos));
      if (decompressed[0] === 0xFF && decompressed[1] === 0xD8 && decompressed.length > 3000) {
        candidates.push(decompressed);
      }
    } catch (_) {}
    pos += 2;
  }

  if (candidates.length === 0) return null;
  // Return the largest candidate
  return candidates.sort((a, b) => b.length - a.length)[0];
}

async function applyFallback(code, hueShift = 10) {
  const fb = FALLBACKS[code];
  if (!fb) return false;
  const fbPath = path.join(OUTPUT_DIR, `${fb}.jpg`);
  if (!fs.existsSync(fbPath)) return false;
  const buf = fs.readFileSync(fbPath);
  const processed = await sharp(buf)
    .modulate({ brightness: 0.97, saturation: 1.06, hue: hueShift })
    .jpeg({ quality: 88 })
    .toBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR, `${code}.jpg`), processed);
  return true;
}

async function main() {
  console.log(`Fixing ${BROKEN.length} broken images...\n`);
  let fixed = 0, fallbacked = 0, failed = 0;

  for (const { code, pdf, fallback } of BROKEN) {
    const outPath = path.join(OUTPUT_DIR, `${code}.jpg`);
    const currentSize = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;

    // If no PDF, go straight to fallback
    if (!pdf || fallback) {
      const ok = await applyFallback(code, 12 * (failed + 1));
      if (ok) {
        const newSize = fs.statSync(outPath).size;
        console.log(`  FALLBACK  ${code}.jpg  (${currentSize} → ${newSize} bytes)`);
        fallbacked++;
      } else {
        console.log(`  FAIL      ${code}.jpg — no fallback available`);
        failed++;
      }
      continue;
    }

    const pdfPath = path.join(IMG_SRC_DIR, pdf);
    if (!fs.existsSync(pdfPath)) {
      console.log(`  MISSING   ${code}.jpg  PDF not found: ${pdf}`);
      const ok = await applyFallback(code);
      ok ? fallbacked++ : failed++;
      continue;
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const extracted = extractBestJpegFromPdf(pdfBuffer);

    if (extracted && extracted.length > currentSize * 1.5) {
      // Verify it's a valid JPEG with sharp before writing
      try {
        const verified = await sharp(extracted).jpeg({ quality: 90 }).toBuffer();
        fs.writeFileSync(outPath, verified);
        console.log(`  EXTRACTED ${code}.jpg  (${currentSize} → ${verified.length} bytes) from PDF`);
        fixed++;
      } catch (_) {
        // Extraction worked but sharp couldn't process it — use fallback
        const ok = await applyFallback(code);
        if (ok) {
          console.log(`  FALLBACK  ${code}.jpg  (sharp failed on extracted data)`);
          fallbacked++;
        } else {
          console.log(`  FAIL      ${code}.jpg`);
          failed++;
        }
      }
    } else {
      // Extracted image is not bigger than what we have — use fallback
      const ok = await applyFallback(code);
      if (ok) {
        const newSize = fs.statSync(outPath).size;
        console.log(`  FALLBACK  ${code}.jpg  (${currentSize} → ${newSize} bytes, PDF had no better image)`);
        fallbacked++;
      } else {
        console.log(`  NO CHANGE ${code}.jpg  (${currentSize} bytes, no better source found)`);
        failed++;
      }
    }
  }

  console.log(`\n✓ Fixed via PDF:      ${fixed}`);
  console.log(`✓ Fixed via fallback: ${fallbacked}`);
  console.log(`✗ Still failed:       ${failed}`);
  console.log('\nDone. Verify the site at http://localhost:3000/products');
}

main();
