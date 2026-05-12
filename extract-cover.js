const fs = require('fs');
const html = fs.readFileSync('ebiza-orthopaedic-enhanced - Copy.html', 'utf8');

// Extract catalogue cover - the large base64 in the hero visual section
const idx = html.indexOf('hero-cover-card');
const chunk = html.substring(idx, idx + 2500000);
const imgMatch = chunk.match(/src="(data:image\/jpeg;base64,[^"]+)"/);
if (imgMatch) {
  const b64 = imgMatch[1].replace('data:image/jpeg;base64,', '');
  fs.writeFileSync('public/images/catalogue-cover.jpg', Buffer.from(b64, 'base64'));
  console.log('Cover image saved: ' + b64.length + ' chars');
} else {
  console.log('Not found');
}

// Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync('app/globals.css', styleMatch[1].trim());
  console.log('CSS saved');
}
