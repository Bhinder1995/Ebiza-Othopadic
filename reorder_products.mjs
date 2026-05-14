import fs from 'fs';
import { PRODUCTS } from './data/products.js';

const sortedProducts = {};
const keys = Object.keys(PRODUCTS).sort();

for (const key of keys) {
    sortedProducts[key] = PRODUCTS[key];
}

const content = `export const PRODUCTS = ${JSON.stringify(sortedProducts, null, 2)};\n`;

fs.writeFileSync('data/products.js', content);
console.log('Products reordered alphabetically by code.');
