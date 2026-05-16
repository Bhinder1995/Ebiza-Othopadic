const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const IMG_DIR = 'c:/Users/HP/Downloads/ebiza/new';
const OUTPUT_DIR = 'c:/Users/HP/Downloads/ebiza/public/images/products';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function extractLargestImage(buffer) {
    let images = [];
    
    // Strategy 1: Find all Zlib streams
    let pos = 0;
    while ((pos = buffer.indexOf(Buffer.from([0x78, 0x9C]), pos)) !== -1) {
        try {
            const decompressed = zlib.inflateSync(buffer.slice(pos));
            if (decompressed[0] === 0xFF && decompressed[1] === 0xD8 && decompressed.length > 2000) {
                images.push(decompressed);
            }
        } catch (e) {}
        pos += 2;
    }

    // Strategy 2: Find all raw JPEGs
    pos = 0;
    while ((pos = buffer.indexOf(Buffer.from([0xFF, 0xD8]), pos)) !== -1) {
        let end = buffer.indexOf(Buffer.from([0xFF, 0xD9]), pos);
        if (end !== -1) {
            const jpeg = buffer.slice(pos, end + 2);
            if (jpeg.length > 2000) images.push(jpeg);
        }
        pos += 2;
    }

    if (images.length > 0) return images.sort((a, b) => b.length - a.length)[0];
    return null;
}

const files = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.pdf'));

files.forEach(file => {
    const match = file.match(/\(([A-Z]{2}-?\d+)\)/i);
    if (match) {
        const code = match[1].toUpperCase();
        console.log(`Processing ${file} for code ${code}...`);
        const buffer = fs.readFileSync(path.join(IMG_DIR, file));
        const image = extractLargestImage(buffer);
        if (image) {
            fs.writeFileSync(path.join(OUTPUT_DIR, `${code}.jpg`), image);
            console.log(`Saved ${code}.jpg`);
        } else {
            console.log(`No image found in ${file}`);
        }
    }
});
