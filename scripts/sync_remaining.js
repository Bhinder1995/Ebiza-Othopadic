const fs = require('fs');

const productsFile = 'data/products.js';
const productsContent = fs.readFileSync(productsFile, 'utf8');

const pdfData = {
    // EI
    "EI-01": { mrp: "760.00", sizes: "S,M,L,XL,XXL" },
    "EI-02": { mrp: "1,625.00", sizes: "S,M,L,XL,XXL" },
    "EI-03": { mrp: "400.00", sizes: "S,M,L,XL,XXL" },
    "EI-04": { mrp: "390.00", sizes: "S,M,L,XL,XXL" },
    "EI-05": { mrp: "525.00", sizes: "S,M,L,XL,XXL" },
    "EI-06": { mrp: "120.00", sizes: "S,M,L,XL,XXL" },
    "EI-07": { mrp: "1,550.00", sizes: "S,M,L,XL,XXL" },
    "EI-08": { mrp: "525.00", sizes: "S,M,L,XL,XXL" },
    // EJ
    "EJ-01": { mrp: "550.00", sizes: "S,M,L,XL,XXL" },
    "EJ-02": { mrp: "325.00", sizes: "S,M,L,XL,XXL" },
    "EJ-03": { mrp: "1,055.00", sizes: "S,M,L,XL,XXL" },
    "EJ-04": { mrp: "999.00", sizes: "S,M,L,XL,XXL" },
    "EJ-05": { mrp: "570.00", sizes: "S,M,L,XL,XXL" },
    "EJ-06": { mrp: "325.00", sizes: "S,M,L,XL,XXL" },
    "EJ-07": { mrp: "3,700.00", sizes: "S,M,L,XL,XXL" },
    "EJ-08": { mrp: "1,100.00", sizes: "S,M,L,XL,XXL" },
    "EJ-09": { mrp: "5,500.00", sizes: "S,M,L,XL,XXL" },
    "EJ-10": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EJ-11": { mrp: "500.00", sizes: "S,M,L,XL,XXL" },
    "EJ-12": { mrp: "12,000.00", sizes: "S,M,L,XL,XXL" },
    "EJ-13": { mrp: "3,200.00", sizes: "S,M,L,XL,XXL" },
    "EJ-14": { mrp: "995.00", sizes: "S,M,L,XL,XXL" },
    "EJ-15": { mrp: "2,100.00", sizes: "S,M,L,XL,XXL" },
    "EJ-16": { mrp: "150.00", sizes: "S,M,L,XL,XXL" },
    "EJ-17": { mrp: "100.00", sizes: "S,M,L,XL,XXL" },
    "EJ-18": { mrp: "350.00", sizes: "S,M,L,XL,XXL" },
    "EJ-19": { mrp: "500.00", sizes: "S,M,L,XL,XXL" },
    "EJ-20": { mrp: "550.00", sizes: "S,M,L,XL,XXL" },
    "EJ-21": { mrp: "1,300.00", sizes: "S,M,L,XL,XXL" },
    "EJ-22": { mrp: "1,000.00", sizes: "S,M,L,XL,XXL" },
    "EJ-23": { mrp: "4,500.00", sizes: "S,M,L,XL,XXL" },
    "EJ-24": { mrp: "550.00", sizes: "S,M,L,XL,XXL" },
    "EJ-25": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EJ-26": { mrp: "125.00", sizes: "S,M,L,XL,XXL" },
    "EJ-27": { mrp: "1,300.00", sizes: "S,M,L,XL,XXL" },
    "EJ-28": { mrp: "250.00", sizes: "S,M,L,XL,XXL" },
    "EJ-29": { mrp: "1,502.00", sizes: "S,M,L,XL,XXL" },
    "EJ-30": { mrp: "1,200.00", sizes: "S,M,L,XL,XXL" },
    // EK
    "EK-01": { mrp: "580.00", sizes: "S,M,L,XL,XXL" },
    "EK-02": { mrp: "695.00", sizes: "S,M,L,XL,XXL" },
    "EK-03": { mrp: "975.00", sizes: "S,M,L,XL,XXL" },
    "EK-04": { mrp: "975.00", sizes: "S,M,L,XL,XXL" },
    "EK-05": { mrp: "1,075.00", sizes: "S,M,L,XL,XXL" },
    "EK-06": { mrp: "1,650.00", sizes: "S,M,L,XL,XXL" },
    "EK-07": { mrp: "2,250.00", sizes: "S,M,L,XL,XXL" },
    "EK-08": { mrp: "2,000.00", sizes: "S,M,L,XL,XXL" },
    "EK-09": { mrp: "3,100.00", sizes: "S,M,L,XL,XXL" },
    "EK-10": { mrp: "2,550.00", sizes: "S,M,L,XL,XXL" },
    "EK-11": { mrp: "2,240.00", sizes: "S,M,L,XL,XXL" },
    "EK-12": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EK-13": { mrp: "1,650.00", sizes: "S,M,L,XL,XXL" },
    "EK-14": { mrp: "1,650.00", sizes: "S,M,L,XL,XXL" },
    "EK-15": { mrp: "5,800.00", sizes: "S,M,L,XL,XXL" },
    "EK-16": { mrp: "5,400.00", sizes: "S,M,L,XL,XXL" },
    "EK-17": { mrp: "2,000.00", sizes: "S,M,L,XL,XXL" },
    "EK-18": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EK-19": { mrp: "12,500.00", sizes: "S,M,L,XL,XXL" },
    "EK-20": { mrp: "10,000.00", sizes: "S,M,L,XL,XXL" },
    // EL
    "EL-01": { mrp: "3,000.00", sizes: "S,M,L,XL,XXL" },
    "EL-02": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EL-03": { mrp: "1,450.00", sizes: "S,M,L,XL,XXL" },
    "EL-04": { mrp: "1,450.00", sizes: "S,M,L,XL,XXL" },
    "EL-05": { mrp: "1,395.00", sizes: "S,M,L,XL,XXL" },
    "EL-06": { mrp: "975.00", sizes: "S,M,L,XL,XXL" },
    "EL-07": { mrp: "499.00", sizes: "S,M,L,XL,XXL" },
    "EL-08": { mrp: "655.00", sizes: "S,M,L,XL,XXL" },
    "EL-09": { mrp: "755.00", sizes: "S,M,L,XL,XXL" },
    "EL-10": { mrp: "499.00", sizes: "S,M,L,XL,XXL" },
    "EL-11": { mrp: "230.00", sizes: "S,M,L,XL,XXL" },
    "EL-12": { mrp: "160.00", sizes: "S,M,L,XL,XXL" },
    "EL-13": { mrp: "160.00", sizes: "S,M,L,XL,XXL" },
    "EL-14": { mrp: "190.00", sizes: "S,M,L,XL,XXL" },
    "EL-15": { mrp: "110.00", sizes: "S,M,L,XL,XXL" },
    "EL-16": { mrp: "50.00", sizes: "S,M,L,XL,XXL" },
    "EL-17": { mrp: "250.00", sizes: "S,M,L,XL,XXL" },
    "EL-18": { mrp: "2,500.00", sizes: "S,M,L,XL,XXL" },
    "EL-19": { mrp: "3,000.00", sizes: "S,M,L,XL,XXL" },
    "EL-20": { mrp: "499.00", sizes: "S,M,L,XL,XXL" },
    "EL-21": { mrp: "222.00", sizes: "S,M,L,XL,XXL" },
    "EL-22": { mrp: "499.00", sizes: "S,M,L,XL,XXL" },
    "EL-23": { mrp: "222.00", sizes: "S,M,L,XL,XXL" },
    "EL-24": { mrp: "59,155.00", sizes: "S,M,L,XL,XXL" }, // Fixed from previous view
    "EL-25": { mrp: "2,150.00", sizes: "S,M,L,XL,XXL" },
    "EL-26": { mrp: "199.00", sizes: "S,M,L,XL,XXL" },
    "EL-27": { mrp: "325.00", sizes: "S,M,L,XL,XXL" },
    "EL-28": { mrp: "375.00", sizes: "S,M,L,XL,XXL" },
    "EL-29": { mrp: "599.00", sizes: "S,M,L,XL,XXL" },
    "EL-30": { mrp: "N/A", sizes: "S,M,L,XL,XXL" },
    "EL-31": { mrp: "N/A", sizes: "S,M,L,XL,XXL" },
    "EL-32": { mrp: "N/A", sizes: "S,M,L,XL,XXL" },
    "EL-33": { mrp: "N/A", sizes: "S,M,L,XL,XXL" },
    "EL-34": { mrp: "250.00", sizes: "S,M,L,XL,XXL" },
    "EL-35": { mrp: "300.00", sizes: "S,M,L,XL,XXL" },
    "EL-36": { mrp: "850.00", sizes: "S,M,L,XL,XXL" },
    "EL-37": { mrp: "500.00", sizes: "S,M,L,XL,XXL" },
    "EL-38": { mrp: "3,500.00", sizes: "S,M,L,XL,XXL" },
    "EL-39": { mrp: "299.00", sizes: "S,M,L,XL,XXL" },
    "EL-40": { mrp: "250.00", sizes: "S,M,L,XL,XXL" },
    "EL-41": { mrp: "5,500.00", sizes: "S,M,L,XL,XXL" },
    "EL-42": { mrp: "300.00", sizes: "S,M,L,XL,XXL" }
};

let updatedContent = productsContent;
for (const [code, data] of Object.entries(pdfData)) {
    const regex = new RegExp(`("${code}": \\{[\\s\\S]*?"mrp": ")(.*?)("[,\\n\\s]*?"sizes": ")(.*?)(")`, 'g');
    updatedContent = updatedContent.replace(regex, (m, p1, p2, p3, p4, p5) => {
        return `${p1}${data.mrp}${p3}${data.sizes}${p5}`;
    });
}

fs.writeFileSync(productsFile, updatedContent);
console.log("Successfully synchronized remaining product sections.");
