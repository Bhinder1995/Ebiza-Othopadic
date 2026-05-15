const fs = require('fs');

const productsFile = 'data/products.js';
const productsContent = fs.readFileSync(productsFile, 'utf8');

// Use regex to find all product entries
const productRegex = /"([A-Z]{2}-\d{2})": \{([\s\S]*?)\}/g;
let match;
let updatedContent = productsContent;

// I'll create a map of prices and sizes from the PDF analysis (manually verified for sections)
const pdfData = {
    // EA
    "EA-01": { mrp: "1,200.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EA-02": { mrp: "935.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EA-03": { mrp: "760.00", sizes: "S,M,L,XL,XXL" },
    "EA-04": { mrp: "2,275.00", sizes: "S,M,L,XL,XXL" },
    "EA-05": { mrp: "850.00", sizes: "S,M,L,XL,XXL,UNI" },
    "EA-06": { mrp: "1,700.00", sizes: "UNI" },
    "EA-07": { mrp: "665.00", sizes: "S,M,L,XL,XXL" },
    "EA-08": { mrp: "705.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EA-09": { mrp: "1,000.00", sizes: "S,M,L,XL,XXL" },
    "EA-10": { mrp: "1,025.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EA-11": { mrp: "735.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EA-12": { mrp: "610.00", sizes: "S,M,L,XL,XXL" },
    "EA-13": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EA-14": { mrp: "1,700.00", sizes: "UNI" },
    // EB
    "EB-01": { mrp: "360.00", sizes: "S,M,L,XL,XXL" },
    "EB-02": { mrp: "440.00", sizes: "S,M,L,XL,XXL" },
    "EB-03": { mrp: "375.00", sizes: "S,M,L,XL,XXL" },
    "EB-04": { mrp: "1,040.00", sizes: "S,M,L,XL,XXL" },
    "EB-05": { mrp: "1,275.00", sizes: "UNI" },
    "EB-06": { mrp: "2,425.00", sizes: "S,M,L,XL,XXL" },
    "EB-07": { mrp: "1,550.00", sizes: "S,M,L,XL,XXL" },
    // EC
    "EC-01": { mrp: "390.00", sizes: "S,M,L,XL,XXL" },
    "EC-02": { mrp: "360.00", sizes: "S,M,L,XL,XXL" },
    "EC-03": { mrp: "745.00", sizes: "S,M,L,XL,XXL" },
    "EC-04": { mrp: "425.00", sizes: "S,M,L,XL,XXL" },
    "EC-05": { mrp: "680.00", sizes: "S,M,L,XL,XXL" },
    "EC-06": { mrp: "1,050.00", sizes: "S,M,L,XL,XXL" },
    "EC-07": { mrp: "1,250.00", sizes: "S,M,L,XL,XXL" },
    "EC-08": { mrp: "175.00", sizes: "S,M,L,XL,XXL" },
    "EC-09": { mrp: "1,650.00", sizes: "S,M,L,XL,XXL" },
    // ED
    "ED-01": { mrp: "135.00", sizes: "S,M,L,XL,XXL" },
    "ED-02": { mrp: "100.00", sizes: "S,M,L,XL,XXL" },
    "ED-03": { mrp: "125.00", sizes: "S,M,L,XL,XXL" },
    "ED-04": { mrp: "225.00", sizes: "S,M,L,XL,XXL" },
    // EE
    "EE-01": { mrp: "220.00", sizes: "S,M,L,XL,XXL" },
    "EE-02": { mrp: "325.00", sizes: "S,M,L,XL,XXL" },
    "EE-03": { mrp: "1,100.00", sizes: "S,M,L,XL" },
    "EE-04": { mrp: "1,240.00", sizes: "S,M,L,XL" },
    "EE-05": { mrp: "340.00", sizes: "S,M,L,XL,XXL" },
    "EE-06": { mrp: "1,375.00", sizes: "S,M,L,XL,XXL" },
    "EE-07": { mrp: "770.00", sizes: "S,M,L,XL,XXL" },
    "EE-08": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EE-09": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EE-10": { mrp: "400.00", sizes: "UNI" },
    "EE-11": { mrp: "4,000.00", sizes: "UNI" },
    "EE-12": { mrp: "2,550.00", sizes: "S,M,L,XL,XXL" },
    "EE-13": { mrp: "1,690.00", sizes: "S,M,L,XL,XXL" },
    "EE-14": { mrp: "1,900.00", sizes: "S,M,L,XL,XXL" },
    "EE-15": { mrp: "1,500.00", sizes: "S,M,L,XL,XXL" },
    // EF
    "EF-01": { mrp: "440.00", sizes: "S,M,L,XL,XXL" },
    "EF-02": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EF-03": { mrp: "1,220.00", sizes: "S,M,L,XL,XXL" },
    "EF-04": { mrp: "1,575.00", sizes: "S,M,L,XL,XXL" },
    "EF-05": { mrp: "595.00", sizes: "S,M,L,XL,XXL" },
    "EF-06": { mrp: "750.00", sizes: "S,M,L,XL,XXL" },
    "EF-07": { mrp: "480.00", sizes: "S,M,L,XL,XXL" },
    "EF-08": { mrp: "1,150.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EF-09": { mrp: "925.00", sizes: "S,M,L,XL,XXL,XXXL" },
    "EF-10": { mrp: "2,750.00", sizes: "S,M,L,XL,XXL" },
    "EF-11": { mrp: "3,050.00", sizes: "S,M,L,XL,XXL" },
    "EF-12": { mrp: "700.00", sizes: "S,M,L,XL,XXL" },
    "EF-13": { mrp: "1,500.00", sizes: "S,M,L,XL,XXL" },
    "EF-14": { mrp: "1,500.00", sizes: "S,M,L,XL,XXL" },
    // EG
    "EG-01": { mrp: "640.00", sizes: "S,M,L,XL,XXL" },
    "EG-02": { mrp: "740.00", sizes: "S,M,L,XL,XXL" },
    "EG-03": { mrp: "225.00", sizes: "S,M,L,XL,XXL" },
    "EG-04": { mrp: "230.00", sizes: "S,M,L,XL,XXL" },
    "EG-05": { mrp: "230.00", sizes: "S,M,L,XL,XXL" },
    "EG-06": { mrp: "250.00", sizes: "S,M,L,XL,XXL" },
    "EG-07": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EG-08": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EG-09": { mrp: "260.00", sizes: "S,M,L,XL,XXL" },
    "EG-10": { mrp: "600.00", sizes: "S,M,L,XL,XXL" },
    "EG-11": { mrp: "975.00", sizes: "S,M,L,XL,XXL" },
    "EG-12": { mrp: "950.00", sizes: "S,M,L,XL,XXL" },
    "EG-13": { mrp: "1,050.00", sizes: "S,M,L,XL,XXL" },
    "EG-14": { mrp: "50.00", sizes: "S,M,L,XL,XXL" },
    "EG-15": { mrp: "350.00", sizes: "S,M,L,XL,XXL" },
    // EH
    "EH-01": { mrp: "400.00", sizes: "S,M,L,XL,XXL" },
    "EH-02": { mrp: "600.00", sizes: "S,M,L,XL,XXL" },
    "EH-03": { mrp: "890.00", sizes: "S,M,L,XL,XXL" },
    "EH-04": { mrp: "2,000.00", sizes: "S,M,L,XL,XXL" },
    "EH-05": { mrp: "1,550.00", sizes: "S,M,L,XL,XXL" },
    "EH-06": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EH-07": { mrp: "375.00", sizes: "S,M,L,XL,XXL" },
    "EH-08": { mrp: "250.00 - 500.00", sizes: "S,M,L,XL,XXL" },
    "EH-09": { mrp: "850.00", sizes: "S,M,L,XL,XXL" },
    "EH-10": { mrp: "2,050.00", sizes: "S,M,L,XL,XXL" },
    "EH-11": { mrp: "500.00", sizes: "S,M,L,XL,XXL" }
};

// Apply updates
for (const [code, data] of Object.entries(pdfData)) {
    const regex = new RegExp(`("${code}": \\{[\\s\\S]*?"mrp": ")(.*?)("[,\\n\\s]*?"sizes": ")(.*?)(")`, 'g');
    updatedContent = updatedContent.replace(regex, (m, p1, p2, p3, p4, p5) => {
        return `${p1}${data.mrp}${p3}${data.sizes}${p5}`;
    });
}

fs.writeFileSync(productsFile, updatedContent);
console.log("Successfully synchronized all product prices and sizes.");
