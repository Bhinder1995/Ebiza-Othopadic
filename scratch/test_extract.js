const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\HP\\Downloads\\ebiza\\img\\ABDOMINAL SUPPORT (EA-08).pdf';
const buffer = fs.readFileSync(filePath);

// Look for JPEG SOI marker FF D8
const start = buffer.indexOf(Buffer.from([0xFF, 0xD8]));
if (start !== -1) {
    // Look for JPEG EOI marker FF D9
    const end = buffer.indexOf(Buffer.from([0xFF, 0xD9]), start);
    if (end !== -1) {
        const jpeg = buffer.slice(start, end + 2);
        fs.writeFileSync('test_extract.jpg', jpeg);
        console.log(`Extracted JPEG from ${start} to ${end + 2}`);
    } else {
        console.log('EOI marker not found');
    }
} else {
    console.log('SOI marker not found');
}
