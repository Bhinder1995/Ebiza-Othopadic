const fs = require('fs');
const zlib = require('zlib');
const buf = fs.readFileSync('c:/Users/HP/Downloads/ebiza/img/SHOULDER IMMOBILIZER (EC-05).pdf');
let pos = 0;
while ((pos = buf.indexOf('stream', pos)) !== -1) {
    let ds = pos + 6;
    if (buf[ds] === 0x0D) ds++;
    if (buf[ds] === 0x0A) ds++;
    let de = buf.indexOf('endstream', ds);
    const data = buf.slice(ds, de);
    console.log(`Stream at ${pos}, length ${data.length}`);
    try {
        const inf = zlib.inflateSync(data);
        console.log(`  Inflated size: ${inf.length}`);
    } catch(e) {
        console.log(`  Inflate failed: ${e.message}`);
    }
    pos = de + 9;
}
