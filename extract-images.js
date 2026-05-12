const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('backup/ebiza-orthopaedic-enhanced.html', 'utf8');

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Find PRODUCTS object
const match = html.match(/const PRODUCTS = ({[\s\S]*?});/);
if (match) {
  const products = JSON.parse(match[1]);
  const newProducts = {};

  for (const [code, details] of Object.entries(products)) {
    if (details.img && details.img.startsWith('data:image/jpeg;base64,')) {
      const base64Data = details.img.replace(/^data:image\/jpeg;base64,/, '');
      const filename = `${code}.jpg`;
      fs.writeFileSync(path.join(imagesDir, filename), base64Data, 'base64');
      
      // Update the product with the new image path
      newProducts[code] = {
        ...details,
        img: `/images/${filename}`
      };
    } else {
      newProducts[code] = details;
    }
  }

  // Write new products data to a JSON or JS file
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const fileContent = `export const PRODUCTS = ${JSON.stringify(newProducts, null, 2)};\n`;
  fs.writeFileSync(path.join(dataDir, 'products.js'), fileContent);
  console.log(`Successfully extracted ${Object.keys(products).length} products and images.`);
} else {
  console.error("PRODUCTS not found in HTML.");
}
