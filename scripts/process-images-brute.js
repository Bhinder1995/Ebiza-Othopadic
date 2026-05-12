const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const IMG_DIR = 'c:/Users/HP/Downloads/ebiza/img';
const OUTPUT_DIR = 'c:/Users/HP/Downloads/ebiza/public/images/products';
const DATA_FILE = 'c:/Users/HP/Downloads/ebiza/data/products.js';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let existingProducts = {};
try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/export const PRODUCTS = ({[\s\S]*?});/);
    if (match) existingProducts = eval(`(${match[1]})`);
} catch (e) {}

const CAT_MAP = {
    'EA': 'body-belts', 'EB': 'cervical', 'EC': 'fracture', 'ED': 'finger-splints',
    'EE': 'foot-ankle', 'EF': 'knee', 'EG': 'wrist-forearm', 'EH': 'traction',
    'EI': 'silicone-foot', 'EJ': 'physio', 'EK': 'walking-aid', 'EL': 'allied', 'EM': 'child-care'
};

function capitalize(str) { return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }

function extractLargestImage(buffer) {
    let images = [];
    
    // Strategy 1: Find all Zlib streams
    let pos = 0;
    while ((pos = buffer.indexOf(Buffer.from([0x78, 0x9C]), pos)) !== -1) {
        try {
            // We try to inflate chunks. Many PDFs wrap images in zlib.
            const decompressed = zlib.inflateSync(buffer.slice(pos));
            if (decompressed[0] === 0xFF && decompressed[1] === 0xD8 && decompressed.length > 2000) {
                images.push(decompressed);
            }
        } catch (e) {}
        pos += 2;
    }

    // Strategy 2: Find all raw JPEGs (FF D8 ... FF D9)
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
const newProducts = {};

console.log(`Brute-force processing ${files.length} files...`);

files.forEach(file => {
    // Improved regex to handle EL29 and other variants
    const match = file.match(/^(.*?)\s*\(?([A-Z]{2}-?\d+)\)?.*\.pdf$/i);
    let name, code;
    if (match) {
        name = capitalize(match[1].trim());
        code = match[2].toUpperCase().trim();
        // Standardize code to XX-00 format if it's XX00
        if (!code.includes('-') && code.length >= 4) {
            code = code.slice(0, 2) + '-' + code.slice(2);
        }
    } else {
        name = capitalize(file.replace(/\.pdf$/i, '').trim());
        code = 'UNKNOWN-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    const prefix = code.split('-')[0];
    const cat = CAT_MAP[prefix] || 'allied';
    const buffer = fs.readFileSync(path.join(IMG_DIR, file));
    const image = extractLargestImage(buffer);

    let finalCode = code;
    let counter = 1;
    while (newProducts[finalCode] && newProducts[finalCode].name.toLowerCase() !== name.toLowerCase()) {
        finalCode = `${code}-${String.fromCharCode(64 + counter)}`;
        counter++;
    }

    if (image) {
        fs.writeFileSync(path.join(OUTPUT_DIR, `${finalCode}.jpg`), image);
        newProducts[finalCode] = {
            name: name,
            desc: existingProducts[code] ? existingProducts[code].desc : `Premium quality ${name} designed for optimal support and comfort.`,
            img: `/images/products/${finalCode}.jpg`,
            cat: cat
        };
        process.stdout.write('.');
    } else {
        newProducts[finalCode] = {
            name: name,
            desc: existingProducts[code] ? existingProducts[code].desc : `Medical grade ${name}.`,
            img: '',
            cat: cat
        };
        process.stdout.write('x');
    }
});

console.log('\nWriting products.js...');
fs.writeFileSync(DATA_FILE, `export const PRODUCTS = ${JSON.stringify(newProducts, null, 2)};\n`);
console.log(`Done. Processed ${Object.keys(newProducts).length} products.`);
