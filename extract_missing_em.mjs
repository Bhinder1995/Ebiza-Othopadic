import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const files = [
    { pdf: 'PHILADELPHIA COLLAR (EM-02).pdf', code: 'EM-02' },
    { pdf: 'SHOULDER IMMOBILIZER (EM-04).pdf', code: 'EM-04' }
];

const imgDir = 'c:/Users/HP/Downloads/ebiza/img';
const outDir = 'c:/Users/HP/Downloads/ebiza/public/images/products';

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
    return images.sort((a, b) => b.length - a.length)[0];
}

files.forEach(f => {
    const pdfPath = path.join(imgDir, f.pdf);
    if (fs.existsSync(pdfPath)) {
        const buffer = fs.readFileSync(pdfPath);
        const img = extract(buffer);
        if (img) {
            fs.writeFileSync(path.join(outDir, `${f.code}.jpg`), img);
            console.log(`Successfully fixed ${f.code}`);
        } else {
            console.log(`Failed to extract from ${f.pdf}`);
        }
    } else {
        console.log(`PDF not found: ${f.pdf}`);
    }
});
