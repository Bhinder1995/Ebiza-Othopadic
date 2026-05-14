import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgDir = path.resolve('./public/images/products');
const productsToModify = [
    'EM-02', 'EM-04'
];

async function processImages() {
    for (const code of productsToModify) {
        const filePath = path.join(imgDir, `${code}.jpg`);
        if (fs.existsSync(filePath)) {
            try {
                const buffer = fs.readFileSync(filePath);
                const processed = await sharp(buffer)
                    .modulate({
                        brightness: 1.05,
                        saturation: 0.95,
                        hue: 5
                    })
                    .toBuffer();
                
                fs.writeFileSync(filePath, processed);
                console.log(`Successfully modified color for ${code}.jpg`);
            } catch (error) {
                console.error(`Error processing ${code}.jpg:`, error.message);
            }
        } else {
            console.log(`File not found: ${code}.jpg`);
        }
    }
}

processImages();
