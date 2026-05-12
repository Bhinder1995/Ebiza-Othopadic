const fs = require('fs');
const zlib = require('zlib');
const buf = fs.readFileSync('c:/Users/HP/Downloads/ebiza/img/SHOULDER IMMOBILIZER (EC-05).pdf');
const ds = 214 + 7; // stream\n
const de = buf.indexOf('endstream', ds);
const data = buf.slice(ds, de);
try {
    const inf = zlib.inflateSync(data);
    console.log(inf.slice(0, 10));
} catch(e) {
    console.log(e.message);
}
