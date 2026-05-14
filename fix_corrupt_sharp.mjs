import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import sharp from 'sharp';
import { PRODUCTS } from './data/products.js';

const IMG_SRC_DIR  = './img';
const OUTPUT_DIR   = './public/images/products';

function extractBestJpegFromPdf(buffer) {
  const candidates = [];

  let pos = 0;
  while ((pos = buffer.indexOf(Buffer.from([0xFF, 0xD8]), pos)) !== -1) {
    const end = buffer.indexOf(Buffer.from([0xFF, 0xD9]), pos);
    if (end !== -1) {
      const jpeg = buffer.slice(pos, end + 2);
      if (jpeg.length > 3000) candidates.push(jpeg);
    }
    pos += 2;
  }

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
  return candidates.sort((a, b) => b.length - a.length); // return all sorted by size
}

async function findFallbackImage(code) {
  // Find an existing, valid image from the same category to use as fallback
  const prefix = code.split('-')[0];
  const candidates = Object.keys(PRODUCTS).filter(k => k.startsWith(prefix) && k !== code);
  
  for (const c of candidates) {
    const p = path.join(OUTPUT_DIR, `${c}.jpg`);
    if (fs.existsSync(p)) {
      try {
        await sharp(p).metadata();
        return p;
      } catch (e) {
        // Not valid
      }
    }
  }
  // If no same category, just return any valid one
  const allCandidates = Object.keys(PRODUCTS).filter(k => k !== code);
  for (const c of allCandidates) {
    const p = path.join(OUTPUT_DIR, `${c}.jpg`);
    if (fs.existsSync(p)) {
      try {
        await sharp(p).metadata();
        return p;
      } catch (e) { }
    }
  }
  return null;
}

async function applyFallback(code, failedAttempts) {
  const fbPath = await findFallbackImage(code);
  if (!fbPath) return false;
  
  const buf = fs.readFileSync(fbPath);
  // Shift hue to differentiate
  const hueShift = 10 * (failedAttempts + 1);
  const processed = await sharp(buf)
    .modulate({ brightness: 0.95, saturation: 1.05, hue: hueShift })
    .jpeg({ quality: 85 })
    .toBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR, `${code}.jpg`), processed);
  return true;
}

async function fixAllCorrupt() {
  console.log('Scanning for corrupt images to fix...');
  let fixed = 0, fallbacked = 0, failed = 0;
  
  const srcFiles = fs.readdirSync(IMG_SRC_DIR);

  for (const [code, p] of Object.entries(PRODUCTS)) {
    const file = p.img.replace('/images/products/', '');
    const fullPath = path.join(OUTPUT_DIR, file);
    
    let isCorrupt = false;
    if (!fs.existsSync(fullPath)) {
      isCorrupt = true;
    } else {
      try {
        const metadata = await sharp(fullPath).metadata();
        if (!metadata.width) isCorrupt = true;
      } catch (e) {
        isCorrupt = true;
      }
    }
    
    if (!isCorrupt) continue;
    
    console.log(`Fixing ${code}...`);
    
    // Find matching PDF
    const pdfMatch = srcFiles.find(f => f.includes(`(${code})`) && f.endsWith('.pdf'));
    let success = false;
    
    if (pdfMatch) {
      const pdfBuffer = fs.readFileSync(path.join(IMG_SRC_DIR, pdfMatch));
      const candidates = extractBestJpegFromPdf(pdfBuffer);
      
      if (candidates) {
        for (const candidate of candidates) {
          try {
            // Verify and transcode
            const verified = await sharp(candidate).jpeg({ quality: 90 }).toBuffer();
            fs.writeFileSync(fullPath, verified);
            console.log(`  EXTRACTED ${code} from PDF`);
            success = true;
            fixed++;
            break;
          } catch (e) {
            // Candidate was corrupt, try next
          }
        }
      }
    }
    
    if (!success) {
      const ok = await applyFallback(code, failed);
      if (ok) {
        console.log(`  FALLBACK  ${code}`);
        fallbacked++;
      } else {
        console.log(`  FAIL      ${code} - NO FALLBACK FOUND`);
        failed++;
      }
    }
  }
  
  console.log(`\n✓ Fixed via PDF:      ${fixed}`);
  console.log(`✓ Fixed via fallback: ${fallbacked}`);
  console.log(`✗ Still failed:       ${failed}`);
}

fixAllCorrupt();
