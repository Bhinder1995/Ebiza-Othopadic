const fs = require('fs');
const file = 'c:/Users/HP/Downloads/ebiza/img/ACUPUNCTURE NEEDLE (EJ-19).pdf';
const buf = fs.readFileSync(file);
const start = buf.indexOf('stream');
if (start !== -1) {
    const data = buf.slice(start, start + 100);
    console.log(data);
    console.log(data.toString('hex'));
} else {
    console.log('No stream found');
}
