const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const IMG_DIR = 'c:/Users/HP/Downloads/ebiza/img';
const OUTPUT_DIR = 'c:/Users/HP/Downloads/ebiza/public/images/products';
const DATA_FILE = 'c:/Users/HP/Downloads/ebiza/data/products.js';

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load existing products to preserve descriptions if possible
let existingProducts = {};
try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/export const PRODUCTS = ({[\s\S]*?});/);
    if (match) {
        existingProducts = eval(`(${match[1]})`);
    }
} catch (e) {
    console.log('Could not load existing products:', e.message);
}

const CAT_MAP = {
    'EA': 'body-belts',
    'EB': 'cervical',
    'EC': 'fracture',
    'ED': 'finger-splints',
    'EE': 'foot-ankle',
    'EF': 'knee',
    'EG': 'wrist-forearm',
    'EH': 'traction',
    'EI': 'silicone-foot',
    'EJ': 'physio',
    'EK': 'walking-aid',
    'EL': 'allied',
    'EM': 'child-care'
};

function capitalize(str) {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function extractImage(buffer) {
    // Strategy 1: Find raw JPEG SOI/EOI
    const start = buffer.indexOf(Buffer.from([0xFF, 0xD8]));
    if (start !== -1) {
        const end = buffer.indexOf(Buffer.from([0xFF, 0xD9]), start);
        if (end !== -1) {
            return buffer.slice(start, end + 2);
        }
    }

    // Strategy 2: Find /Filter [/FlateDecode /DCTDecode] stream
    // This is more complex. We look for 'stream' ... 'endstream'
    let images = [];
    let pos = 0;
    while ((pos = buffer.indexOf('stream', pos)) !== -1) {
        let dataStart = pos + 6;
        if (buffer[dataStart] === 0x0D && buffer[dataStart+1] === 0x0A) {
            dataStart += 2;
        } else if (buffer[dataStart] === 0x0A) {
            dataStart += 1;
        }
        
        // Find all possible endstream markers
        let endstreamPos = dataStart;
        while ((endstreamPos = buffer.indexOf('endstream', endstreamPos)) !== -1) {
            let actualEnd = endstreamPos;
            if (buffer[endstreamPos - 1] === 0x0A) {
                actualEnd--;
                if (buffer[endstreamPos - 2] === 0x0D) {
                    actualEnd--;
                }
            }
            
            const streamData = buffer.slice(dataStart, actualEnd);
            
            // Try Strategy: Inflate
            try {
                const decompressed = zlib.inflateSync(streamData);
                if (decompressed[0] === 0xFF && decompressed[1] === 0xD8 && decompressed.length > 2048) {
                    images.push(decompressed);
                    break; 
                }
            } catch (e) {
                if (streamData[0] === 0xFF && streamData[1] === 0xD8 && streamData.length > 2048) {
                    images.push(streamData);
                    break;
                }
            }
            endstreamPos += 9;
        }
        pos += 6;
    }

    if (images.length > 0) {
        // Return the largest image found
        return images.sort((a, b) => b.length - a.length)[0];
    }

    return null;
}

const files = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.pdf'));
const newProducts = {};

console.log(`Processing ${files.length} files...`);

files.forEach(file => {
    // Improved regex to capture name and code even with extra spaces or (1) suffixes
    const match = file.match(/^(.*?)\s*\(?([A-Z]{2}-\d{2})\)?.*\.pdf$/i);
    
    let name, code;
    if (match) {
        name = capitalize(match[1].trim());
        code = match[2].toUpperCase().trim();
    } else {
        // Fallback for files without a clear (CODE) pattern
        name = capitalize(file.replace(/\.pdf$/i, '').trim());
        code = 'UNKNOWN-' + Math.random().toString(36).substr(2, 5).toUpperCase();
        console.warn(`Could not find code in filename: ${file}, assigning temporary code: ${code}`);
    }

    const prefix = code.split('-')[0];
    const cat = CAT_MAP[prefix] || 'allied';

    let finalCode = code;
    let counter = 1;
    while (newProducts[finalCode] && newProducts[finalCode].name.toLowerCase() !== name.toLowerCase()) {
        finalCode = `${code}-${String.fromCharCode(64 + counter)}`;
        counter++;
    }

    const buffer = fs.readFileSync(path.join(IMG_DIR, file));
    const image = extractImage(buffer);

    if (image) {
        const outPath = path.join(OUTPUT_DIR, `${finalCode}.jpg`);
        fs.writeFileSync(outPath, image);
        
        // Build product entry
        newProducts[finalCode] = {
            name: name,
            desc: existingProducts[code] ? existingProducts[code].desc : `Premium quality ${name} designed for optimal support and comfort.`,
            mrp: existingProducts[code] ? existingProducts[code].mrp : undefined,
            sizes: existingProducts[code] ? existingProducts[code].sizes : undefined,
            img: `/images/products/${finalCode}.jpg`,
            cat: cat
        };
        process.stdout.write('.');
    } else {
        console.warn(`\nFailed to extract image from ${file}`);
        // Fallback if we want to keep the entry without image
        newProducts[code] = {
            name: name,
            desc: existingProducts[code] ? existingProducts[code].desc : `Premium quality ${name} for medical use.`,
            mrp: existingProducts[code] ? existingProducts[code].mrp : undefined,
            sizes: existingProducts[code] ? existingProducts[code].sizes : undefined,
            img: '',
            cat: cat
        };
    }
});

console.log('\nWriting new products.js...');
const fileContent = `export const PRODUCTS = ${JSON.stringify(newProducts, null, 2)};\n`;
fs.writeFileSync(DATA_FILE, fileContent);

console.log(`Successfully processed ${Object.keys(newProducts).length} products.`);
