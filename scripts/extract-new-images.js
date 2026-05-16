const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfs = [
  'AFO NIGHT SPLINT CHILD (EM-10).pdf',
  'SPECIAL BED PAN (EL-10).pdf'
];

const newDir = 'c:\\Users\\HP\\Downloads\\ebiza\\new';
const outputDir = 'c:\\Users\\HP\\Downloads\\ebiza\\public\\images\\products';

pdfs.forEach(pdf => {
  const pdfPath = path.join(newDir, pdf);
  const baseName = pdf.match(/\(([^)]+)\)/)?.[1] || pdf.split(' ')[0];
  console.log(`Extracting from ${pdf} as ${baseName}...`);
  
  try {
    // Using pdf-poppler or similar if available, or just a placeholder for now
    // Actually I'll use a simple command if possible, but I don't know what's installed.
    // I'll try to use a node library if I can install it, but I can't.
    // I'll just check if I can use 'magick' (ImageMagick) which is common.
    execSync(`magick convert -density 300 "${pdfPath}"[0] "${path.join(outputDir, baseName + '.jpg')}"`);
    console.log(`Successfully extracted ${baseName}.jpg`);
  } catch (err) {
    console.error(`Failed to extract from ${pdf}: ${err.message}`);
  }
});
