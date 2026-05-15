import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const imgDir = 'c:/Users/HP/Downloads/ebiza/img';
const outDir = 'c:/Users/HP/Downloads/ebiza/public/images/products';
const newDir = 'c:/Users/HP/Downloads/ebiza/new';

function extract(buffer) {
    let images = [];
    let pos = 0;
    while ((pos = buffer.indexOf('stream', pos)) !== -1) {
        let dataStart = pos + 6;
        if (buffer[dataStart] === 0x0D && buffer[dataStart+1] === 0x0A) dataStart += 2;
        else if (buffer[dataStart] === 0x0A) dataStart += 1;
        
        let endstreamPos = buffer.indexOf('endstream', dataStart);
        if (endstreamPos !== -1) {
            let actualEnd = endstreamPos;
            if (buffer[endstreamPos - 1] === 0x0A) actualEnd--;
            if (buffer[endstreamPos - 2] === 0x0D) actualEnd--;
            
            const streamData = buffer.slice(dataStart, actualEnd);
            try {
                const decompressed = zlib.inflateSync(streamData);
                if (decompressed[0] === 0xFF && decompressed[1] === 0xD8) {
                    images.push(decompressed);
                }
            } catch (e) {
                if (streamData[0] === 0xFF && streamData[1] === 0xD8) {
                    images.push(streamData);
                }
            }
        }
        pos += 6;
    }
    // Return largest image found (usually the main product image)
    return images.sort((a, b) => b.length - a.length)[0];
}

const filesToExtract = [
    { pdf: 'AFO NIGHT SPLINT (EE-11).pdf', code: 'EE-11' },
    { pdf: 'THIGH BRACE WITH PELVIC SUPPORT (EC-09).pdf', code: 'EC-09' },
    { pdf: 'DVT STOCKINGS ABOVE KNEE (EE-13).pdf', code: 'EE-14' }, // Shifted code
    { pdf: 'FINGER COT SPLINT (ED-01).pdf', code: 'ED-01' },
    { pdf: 'MALLET FINGER SPLINT (ED-02).pdf', code: 'ED-02' },
    { pdf: 'FROG SPLINT (ED-03).pdf', code: 'ED-03' },
    { pdf: 'FINGER EXTENSION SPLINT (ED-04).pdf', code: 'ED-04' }
];

filesToExtract.forEach(f => {
    const pdfPath = path.join(imgDir, f.pdf);
    if (fs.existsSync(pdfPath)) {
        const buffer = fs.readFileSync(pdfPath);
        const img = extract(buffer);
        if (img) {
            fs.writeFileSync(path.join(outDir, `${f.code}.jpg`), img);
            console.log(`Extracted ${f.code} from ${f.pdf}`);
        } else {
            console.log(`Failed to extract from ${f.pdf}`);
        }
    } else {
        console.log(`PDF not found: ${pdfPath}`);
    }
});

// Handle WhatsApp images
const waImages = [
    { src: 'WhatsApp Image 2026-05-14 at 18.32.44.jpeg', code: 'EF-12' },
    { src: 'WhatsApp Image 2026-05-14 at 18.32.45 (1).jpeg', code: 'EF-13' },
    { src: 'WhatsApp Image 2026-05-14 at 18.32.45.jpeg', code: 'EF-14' },
    { src: 'WhatsApp Image 2026-05-14 at 18.32.46.jpeg', code: 'EC-01' }
];

waImages.forEach(f => {
    const srcPath = path.join(newDir, f.src);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(outDir, `${f.code}.jpg`));
        console.log(`Copied ${f.code} from ${f.src}`);
    } else {
        console.log(`WhatsApp image not found: ${srcPath}`);
    }
});
