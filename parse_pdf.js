const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('EBIZA_Product_Price_List_v2.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('scratch/pdf_text.txt', data.text);
    console.log('PDF parsed and saved to scratch/pdf_text.txt');
}).catch(function(error) {
    console.error(error);
});
