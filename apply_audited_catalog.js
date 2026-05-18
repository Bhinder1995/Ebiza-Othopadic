const fs = require('fs');

// Load original products
const originalFile = fs.readFileSync('./data/products.js', 'utf8');
const jsonStr = originalFile.replace('export const PRODUCTS = ', '').replace(/;\s*$/, '');
const products = JSON.parse(jsonStr);

// Audited catalog dictionary
const auditedCatalog = {
  // EA Series (Body Belts & Braces Support)
  "EA-01": { name: "Contoured Lumbosacral Support", mrp: "1,200.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EA-02": { name: "Lumbosacral Support", mrp: "935.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EA-03": { name: "Lumbosacral Support (Eco)", mrp: "760.00", sizes: "S, M, L, XL, XXL" },
  "EA-04": { name: "Taylor's Brace (Long/Short)", mrp: "2,275.00", sizes: "S, M, L, XL, XXL" },
  "EA-05": { name: "Posture Corrector", mrp: "850.00", sizes: "S, M, L, XL, XXL" },
  "EA-06": { name: "Ash Brace (Hyper Extension Brace)", mrp: "1,700.00", sizes: "UNIVERSAL" },
  "EA-07": { name: "Rib Belt", mrp: "665.00", sizes: "S, M, L, XL, XXL" },
  "EA-08": { name: "Abdominal Support", mrp: "705.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EA-09": { name: "Colostomy Abdominal Binder", mrp: "1,000.00", sizes: "S, M, L, XL, XXL" },
  "EA-10": { name: "Chest Binder", mrp: "1,025.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EA-11": { name: "Pelvic Binder", mrp: "735.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EA-12": { name: "Hernia Support", mrp: "610.00", sizes: "S, M, L, XL, XXL" },
  "EA-13": { name: "Hernia Bike", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EA-14": { name: "Orthopaedic Backrest", mrp: "1,700.00", sizes: "UNIVERSAL" },

  // EB Series (Cervical Support)
  "EB-01": { name: "Cervical Soft Collar", mrp: "360.00", sizes: "S, M, L, XL, XXL" },
  "EB-02": { name: "Adjustable Hard Cervical Collar", mrp: "440.00", sizes: "S, M, L, XL, XXL" },
  "EB-03": { name: "Cervical Collar Boneless", mrp: "375.00", sizes: "S, M, L, XL, XXL" },
  "EB-04": { name: "Philadelphia Collar", mrp: "1,040.00", sizes: "S, M, L, XL, XXL" },
  "EB-05": { name: "Cervical Pillow (Regular)", mrp: "1,275.00", sizes: "UNIVERSAL" },
  "EB-06": { name: "Memory Foam Pillow", mrp: "2,425.00", sizes: "S, M, L, XL, XXL" },
  "EB-07": { name: "U-Pillow", mrp: "1,550.00", sizes: "S, M, L, XL, XXL" },

  // EC Series (Fracture Braces Support)
  "EC-01": { name: "Pouch Arm Sling Baggy", mrp: "390.00", sizes: "S, M, L, XL, XXL" },
  "EC-02": { name: "Arm Sling Tropical", mrp: "360.00", sizes: "S, M, L, XL, XXL" },
  "EC-03": { name: "Cast Shoe", mrp: "745.00", sizes: "S, M, L, XL, XXL" },
  "EC-04": { name: "Clavicle Brace", mrp: "425.00", sizes: "S, M, L, XL, XXL" },
  "EC-05": { name: "Shoulder Immobilizer", mrp: "680.00", sizes: "S, M, L, XL, XXL" },
  "EC-06": { name: "Shoulder Support (Bobath Cuff)", mrp: "1,050.00", sizes: "S, M, L, XL, XXL" },
  "EC-07": { name: "Shoulder Support Elastic", mrp: "1,250.00", sizes: "S, M, L, XL, XXL" },
  "EC-08": { name: "Sling Strap", mrp: "175.00", sizes: "S, M, L, XL, XXL" },
  "EC-09": { name: "Thigh Brace with Pelvic Support", mrp: "1,650.00", sizes: "S, M, L, XL, XXL" },

  // ED Series (Finger Splints)
  "ED-01": { name: "Finger Cot Splint", mrp: "135.00", sizes: "S, M, L, XL, XXL" },
  "ED-02": { name: "Mallet Finger Splint", mrp: "100.00", sizes: "S, M, L, XL, XXL" },
  "ED-03": { name: "Frog Splint", mrp: "125.00", sizes: "S, M, L, XL, XXL" },
  "ED-04": { name: "Finger Extension Splint", mrp: "225.00", sizes: "S, M, L, XL, XXL" },

  // EE Series (Foot & Ankle Supports / Stockings)
  "EE-01": { name: "Ankle Binder", mrp: "220.00", sizes: "S, M, L, XL, XXL" },
  "EE-02": { name: "Anklet with Binder Support", mrp: "325.00", sizes: "S, M, L, XL, XXL" },
  "EE-03": { name: "Foot Drop Splint", mrp: "1,100.00", sizes: "S, M, L, XL" },
  "EE-04": { name: "Foot Drop Splint with Padding", mrp: "1,240.00", sizes: "S, M, L, XL" },
  "EE-05": { name: "Anklet Comfort Pair", mrp: "340.00", sizes: "S, M, L, XL, XXL" },
  "EE-06": { name: "PF Night Splint De-Rotation", mrp: "1,375.00", sizes: "S, M, L, XL, XXL" },
  "EE-07": { name: "Ankle Brace Lace Up", mrp: "770.00", sizes: "S, M, L, XL, XXL" },
  "EE-08": { name: "Anklet Pair", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EE-09": { name: "Leg Restrainer", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EE-10": { name: "De-Rotation Shoe", mrp: "400.00", sizes: "UNIVERSAL" },
  "EE-11": { name: "AFO Night Splint", mrp: "4,000.00", sizes: "UNIVERSAL" },
  "EE-12": { name: "Compression Stockings Above Knee", mrp: "2,550.00", sizes: "S, M, L, XL, XXL" },
  "EE-13": { name: "Compression Stockings Below Knee", mrp: "1,690.00", sizes: "S, M, L, XL, XXL" },
  "EE-14": { name: "DVT Stockings Above Knee", mrp: "1,900.00", sizes: "S, M, L, XL, XXL" },
  "EE-15": { name: "DVT Stockings Below Knee", mrp: "1,500.00", sizes: "S, M, L, XL, XXL" },

  // EF Series (Knee Braces Support)
  "EF-01": { name: "Tubular Knee Support Patella Open", mrp: "440.00", sizes: "S, M, L, XL, XXL" },
  "EF-02": { name: "Knee Cap Skin Colour", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EF-03": { name: "Neoprene Knee Support", mrp: "1,220.00", sizes: "S, M, L, XL, XXL" },
  "EF-04": { name: "Neoprene Knee Support with Hinges", mrp: "1,575.00", sizes: "UNIVERSAL" },
  "EF-05": { name: "Drytex Knee Support", mrp: "595.00", sizes: "UNIVERSAL" },
  "EF-06": { name: "Drytex Knee Hinge Support", mrp: "750.00", sizes: "S, M, L, XL, XXL" },
  "EF-07": { name: "Knee Cap 3D", mrp: "480.00", sizes: "S, M, L, XL, XXL" },
  "EF-08": { name: "Knee Immobilizer Long", mrp: "1,150.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EF-09": { name: "Knee Immobilizer Short", mrp: "925.00", sizes: "S, M, L, XL, XXL, XXXL" },
  "EF-10": { name: "R.O.M. Knee Brace", mrp: "2,750.00", sizes: "UNIVERSAL" },
  "EF-11": { name: "Abduction Pillow", mrp: "3,050.00", sizes: "S, M, L, XL, XXL" },
  "EF-12": { name: "Elastic Knee Support", mrp: "700.00", sizes: "S, M, L, XL, XXL" },
  "EF-13": { name: "Functional Knee Support", mrp: "1,500.00", sizes: "S, M, L, XL, XXL" },
  "EF-14": { name: "OA Knee Support", mrp: "1,500.00", sizes: "S, M, L, XL, XXL" },

  // EG Series (Wrist & Forearm Brace Support)
  "EG-01": { name: "Wrist & Forearm Brace Short", mrp: "640.00", sizes: "S, M, L, XL, XXL" },
  "EG-02": { name: "Wrist & Forearm Brace Long", mrp: "740.00", sizes: "S, M, L, XL, XXL" },
  "EG-03": { name: "Wrist Support", mrp: "225.00", sizes: "S, M, L, XL, XXL" },
  "EG-04": { name: "Wrist Brace with Thumb Support", mrp: "230.00", sizes: "S, M, L, XL, XXL" },
  "EG-05": { name: "Elbow Support with Strap Comfort", mrp: "230.00", sizes: "S, M, L, XL, XXL" },
  "EG-06": { name: "Tennis Elbow Support with Silicone Pad", mrp: "250.00", sizes: "S, M, L, XL, XXL" },
  "EG-07": { name: "Carpal Tunnel Splint", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EG-08": { name: "Hand Restrainer", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EG-09": { name: "Thumb Spica Splint", mrp: "260.00", sizes: "S, M, L, XL, XXL" },
  "EG-10": { name: "Wrist Splint (Ambidextrous)", mrp: "600.00", sizes: "S, M, L, XL, XXL" },
  "EG-11": { name: "Arm Immobilizer (Adjustable)", mrp: "975.00", sizes: "S, M, L, XL, XXL" },
  "EG-12": { name: "Static Cockup Splint Rt./Lt.", mrp: "950.00", sizes: "S, M, L, XL, XXL" },
  "EG-13": { name: "Dynamic Splint Rt./Lt.", mrp: "1,050.00", sizes: "S, M, L, XL, XXL" },
  "EG-14": { name: "Tourniquet", mrp: "50.00", sizes: "S, M, L, XL, XXL" },
  "EG-15": { name: "Elbow Restrainer", mrp: "350.00", sizes: "S, M, L, XL, XXL" },

  // EH Series (Traction Kits)
  "EH-01": { name: "Skin / Leg Traction Support", mrp: "400.00", sizes: "S, M, L, XL, XXL" },
  "EH-02": { name: "Leg Traction Brace", mrp: "600.00", sizes: "S, M, L, XL, XXL" },
  "EH-03": { name: "Pelvic Traction Belt", mrp: "890.00", sizes: "S, M, L, XL, XXL" },
  "EH-04": { name: "Foot Traction Kit", mrp: "1,550.00", sizes: "S, M, L, XL, XXL" },
  "EH-05": { name: "Cervical Traction Kit", mrp: "2,000.00", sizes: "S, M, L, XL, XXL" },
  "EH-06": { name: "Pelvic Traction Kit", mrp: "2,500.00", sizes: "S, M, L, XL, XXL" },
  "EH-07": { name: "Traction Weight Bag", mrp: "375.00", sizes: "S, M, L, XL, XXL" },
  "EH-08": { name: "Traction Weight Rubber", mrp: { "2.5 LB": "250.00", "5 LB": "500.00" }, sizes: "2.5 LB, 5 LB" },
  "EH-09": { name: "Thomas Splint", mrp: "850.00", sizes: "CH, S, M, L, XL, XXL" },
  "EH-10": { name: "Bohler Braun Splint", mrp: "2,050.00", sizes: "S, M, L, XL, XXL" },
  "EH-11": { name: "Shoulder Pulley", mrp: "500.00", sizes: "S, M, L, XL, XXL" },

  // EI Series (Silicone & Foot Products)
  "EI-01": { name: "Silicone Heel Cups", mrp: "760.00", sizes: "S, M, L, XL, XXL" },
  "EI-02": { name: "Silicone Full Insole", mrp: "1,625.00", sizes: "S, M, L, XL, XXL" },
  "EI-03": { name: "Silicone Gel Ball", mrp: { "RED": "425.00", "YELLOW": "400.00" }, sizes: "RED, YELLOW" },
  "EI-04": { name: "Silicone Arch Support", mrp: "400.00", sizes: "S, M, L, XL, XXL" },
  "EI-05": { name: "Bunion Splint", mrp: "390.00", sizes: "S, M, L, XL, XXL" },
  "EI-06": { name: "Toe Separator with Silicone", mrp: "525.00", sizes: "S, M, L, XL, XXL" },
  "EI-07": { name: "Silicone Full Insole with Medial Arch", mrp: "1,550.00", sizes: "S, M, L, XL, XXL" },
  "EI-08": { name: "Hot & Cold Gel Pack", mrp: "525.00", sizes: "S, M, L, XL, XXL" },
  "EI-09": { name: "Round Head Rest Support Open", mrp: { "S": "2,000.00", "M": "2,550.00", "L": "6,100.00", "XL": "7,000.00" }, sizes: "S, M, L, XL" },
  "EI-10": { name: "Round Head Rest Support Close", mrp: { "S": "2,200.00", "M": "2,650.00", "L": "6,500.00", "XL": "7,800.00" }, sizes: "S, M, L, XL" },
  "EI-11": { name: "Horse Shoe Head Support Open", mrp: { "S": "2,000.00", "M": "2,700.00", "L": "5,700.00", "XL": "6,900.00" }, sizes: "S, M, L, XL" },
  "EI-12": { name: "Horse Shoe Head Support Close", mrp: { "S": "2,100.00", "M": "2,800.00", "L": "5,800.00", "XL": "7,000.00" }, sizes: "S, M, L, XL" },

  // EJ Series (Physio Products)
  "EJ-01": { name: "Weight Cuff", mrp: { "500 GM": "500.00", "1 KG": "780.00", "2 KG": "1,225.00" }, sizes: "500 GM, 1 KG, 2 KG" },
  "EJ-02": { name: "Exercising Ball (Sponge)", mrp: "75.00", sizes: "UNIVERSAL" },
  "EJ-03": { name: "Theraband", mrp: { "Yellow": "720.00", "Red": "815.00", "Green": "935.00", "Blue": "1,055.00", "Black": "1,140.00", "Silver": "1,380.00", "Gold": "1,700.00" }, sizes: "Yellow, Red, Green, Blue, Black, Silver, Gold" },
  "EJ-04": { name: "Theraputty", mrp: { "Yellow": "999.00", "Red": "999.00", "Green": "999.00", "Blue": "999.00", "Black": "999.00" }, sizes: "Yellow, Red, Green, Blue, Black" },
  "EJ-05": { name: "Hand Exerciser Spike Ball", mrp: "570.00", sizes: "UNIVERSAL" },
  "EJ-06": { name: "Finger Exerciser", mrp: "325.00", sizes: "Blue Soft, Green Medium, Orange Hard" },
  "EJ-07": { name: "Balance Pad Square", mrp: "3,700.00", sizes: "UNIVERSAL" },
  "EJ-08": { name: "Gel Ball Oval", mrp: "1,100.00", sizes: "UNIVERSAL" },
  "EJ-09": { name: "Flex Bar", mrp: { "Red": "5,500.00", "Yellow": "4,150.00", "Green": "5,600.00", "Blue": "6,750.00" }, sizes: "Red, Yellow, Green, Blue" },
  "EJ-10": { name: "Hand Exerciser", mrp: "300.00", sizes: "UNIVERSAL" },
  "EJ-11": { name: "Adjustable Hand Gripper", mrp: "500.00", sizes: "UNIVERSAL" },
  "EJ-12": { name: "Stability Trainer Theraband", mrp: "12,000.00", sizes: "UNIVERSAL" },
  "EJ-13": { name: "Hand Xtrainer", mrp: "3,200.00", sizes: "Red, Blue, Green, Black" },
  "EJ-14": { name: "Kinesiology Tape Cotton", mrp: "995.00", sizes: "Pink, Yellow, Blue, Green" },
  "EJ-15": { name: "Moist Head Pad Set", mrp: "2,100.00", sizes: "UNIVERSAL" },
  "EJ-16": { name: "V-Shape Hand Grip", mrp: "150.00", sizes: "UNIVERSAL" },
  "EJ-17": { name: "Feeding Bottle", mrp: "100.00", sizes: "125 ML" },
  "EJ-18": { name: "Eye Mask Neonatal", mrp: "350.00", sizes: "UNIVERSAL" },
  "EJ-19": { name: "Acupuncture Needle", mrp: { "0.25*13 MM": "500.00", "0.25*25 MM": "525.00", "0.25*50 MM": "550.00" }, sizes: "0.25*13 MM, 0.25*25 MM, 0.25*50 MM" },
  "EJ-20": { name: "Pocket Exerciser", mrp: { "S": "75.00", "M": "125.00" }, sizes: "S, M" },
  "EJ-21": { name: "Resistance Tubing with Handle", mrp: { "Yellow": "480.00", "Red": "540.00", "Green": "600.00", "Blue": "660.00", "Silver": "900.00" }, sizes: "Yellow, Red, Green, Blue, Silver" },
  "EJ-22": { name: "Tubing Sleeve", mrp: { "Blue": "900.00", "Red": "1,300.00", "Yellow": "1,000.00" }, sizes: "Blue, Red, Yellow" },
  "EJ-23": { name: "Power Web (Web Exerciser)", mrp: { "Yellow": "900.00", "Red": "4,500.00", "Green": "4,500.00" }, sizes: "Yellow, Red, Green" },
  "EJ-24": { name: "Palm Exerciser", mrp: { "Yellow": "550.00", "Blue": "550.00", "Green": "550.00" }, sizes: "Yellow, Blue, Green" },
  "EJ-25": { name: "Foam Roller -- 45 cm", mrp: "2,500.00", sizes: "45 CM" },
  "EJ-26": { name: "US Gel -- 250 ml", mrp: "125.00", sizes: "250 ML" },
  "EJ-27": { name: "US Gel -- 5 kg", mrp: "1,300.00", sizes: "5 KG" },
  "EJ-28": { name: "Thera Wax", mrp: { "250 GM": "250.00", "500 GM": "500.00" }, sizes: "250 GM, 500 GM" },
  "EJ-29": { name: "Theraband Loop", mrp: { "Yellow": "1,047.00", "Red": "1,226.00", "Green": "1,331.00", "Blue": "1,502.00" }, sizes: "Yellow, Red, Green, Blue" },
  "EJ-30": { name: "Adjustable Weight Cuff -- 2 kg", mrp: "1,200.00", sizes: "2 KG" },

  // EK Series (Walking Aid Products)
  "EK-01": { name: "Single Stick Black (Mono Pod)", mrp: "580.00", sizes: "UNIVERSAL" },
  "EK-02": { name: "Single Stick Green (Mono Pod)", mrp: "695.00", sizes: "UNIVERSAL" },
  "EK-03": { name: "Tripod Stick", mrp: "975.00", sizes: "UNIVERSAL" },
  "EK-04": { name: "Quadripod Stick", mrp: "975.00", sizes: "UNIVERSAL" },
  "EK-05": { name: "Elbow Crutches", mrp: "1,075.00", sizes: "UNIVERSAL" },
  "EK-06": { name: "Auxiliary Crutches", mrp: "1,650.00", sizes: "UNIVERSAL" },
  "EK-07": { name: "Walker With Wheel", mrp: "2,250.00", sizes: "UNIVERSAL" },
  "EK-08": { name: "Walker Without Wheels", mrp: "2,000.00", sizes: "UNIVERSAL" },
  "EK-09": { name: "Reciprocal Walker", mrp: "3,100.00", sizes: "UNIVERSAL" },
  "EK-10": { name: "Walking Frame CRC With Wheel", mrp: "2,550.00", sizes: "UNIVERSAL" },
  "EK-11": { name: "Walking Frame CRC Without Wheel", mrp: "2,240.00", sizes: "UNIVERSAL" },
  "EK-12": { name: "Commode Chair", mrp: "2,500.00", sizes: "UNIVERSAL" },
  "EK-13": { name: "Commode Stool With Pot", mrp: "1,650.00", sizes: "UNIVERSAL" },
  "EK-14": { name: "Commode Stool", mrp: "1,650.00", sizes: "UNIVERSAL" },
  "EK-15": { name: "Commode Chair Height Adj. With Wheel", mrp: "5,800.00", sizes: "UNIVERSAL" },
  "EK-16": { name: "Commode Chair Height Adj. Without Wheel", mrp: "5,400.00", sizes: "UNIVERSAL" },
  "EK-17": { name: "Bed Back Rest", mrp: "2,000.00", sizes: "UNIVERSAL" },
  "EK-18": { name: "Bed Back Rest With Handle", mrp: "2,500.00", sizes: "UNIVERSAL" },
  "EK-19": { name: "Wheel Chair", mrp: "10,000.00", sizes: "UNIVERSAL" },
  "EK-20": { name: "Special Wheel Chair", mrp: "12,500.00", sizes: "UNIVERSAL" },

  // EL Series (Allied Products)
  "EL-01": { name: "Portable Soft Stretcher", mrp: "3,000.00", sizes: "UNIVERSAL" },
  "EL-02": { name: "Trolley Cover", mrp: "2,500.00", sizes: "UNIVERSAL" },
  "EL-03": { name: "Donut Cushion", mrp: "1,450.00", sizes: "Grey, Blue" },
  "EL-04": { name: "Coccyx Cushion", mrp: "1,450.00", sizes: "Grey, Blue" },
  "EL-05": { name: "Heating Pad with Regulator", mrp: "1,395.00", sizes: "UNIVERSAL" },
  "EL-06": { name: "Heating Pad with Regulator", mrp: "975.00", sizes: "UNIVERSAL" },
  "EL-07": { name: "Heating Pad with Switch", mrp: "499.00", sizes: "UNIVERSAL" },
  "EL-08": { name: "Steam Inhalation Pot (Vaporizer)", mrp: "655.00", sizes: "UNIVERSAL" },
  "EL-09": { name: "Steam Inhalation Pot With Switch", mrp: "755.00", sizes: "UNIVERSAL" },
  "EL-10": { name: "Bed Pan Special", mrp: "499.00", sizes: "UNIVERSAL" },
  "EL-11": { name: "Bed Pan Normal", mrp: "230.00", sizes: "UNIVERSAL" },
  "EL-12": { name: "Urine Pot Male", mrp: "160.00", sizes: "UNIVERSAL" },
  "EL-13": { name: "Urine Pot Female", mrp: "160.00", sizes: "UNIVERSAL" },
  "EL-14": { name: "Urine Pot Unisex", mrp: "190.00", sizes: "UNIVERSAL" },
  "EL-15": { name: "Sputum Pot", mrp: "110.00", sizes: "UNIVERSAL" },
  "EL-16": { name: "Ounce Measuring Glass", mrp: "50.00", sizes: "120 ML" },
  "EL-17": { name: "Pint Measuring Glass", mrp: "250.00", sizes: "1000 ML" },
  "EL-18": { name: "Medical Arch Shoe", mrp: "2,500.00", sizes: "S, M, L, XL, XXL" },
  "EL-19": { name: "Calcalium Shoe", mrp: "3,000.00", sizes: "S, M, L, XL, XXL" },
  "EL-20": { name: "Spirometer", mrp: "499.00", sizes: "UNIVERSAL" },
  "EL-21": { name: "Digital Thermometer", mrp: "222.00", sizes: "UNIVERSAL" },
  "EL-22": { name: "Oval Thermometer", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-23": { name: "Digital Weight Machine", mrp: "2,150.00", sizes: "UNIVERSAL" },
  "EL-24": { name: "Hot Water Bag", mrp: { "500 ML": "199.00", "2 Litre": "325.00", "2.5 Litre": "375.00" }, sizes: "500 ML, 2 Litre, 2.5 Litre" },
  "EL-25": { name: "B.P. Machine Digital", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-26": { name: "B.P. Machine Manual", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-27": { name: "Electric Hot Pack", mrp: "599.00", sizes: "UNIVERSAL" },
  "EL-28": { name: "Stethoscope", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-29": { name: "Nebulizer", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-30": { name: "Pulse Oximeter", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-31": { name: "Breast Pump Machine", mrp: "N/A", sizes: "UNIVERSAL" },
  "EL-32": { name: "Rubber Sheet (Ordinary 1 Mtr)", mrp: { "Ordinary": "250.00", "Special": "300.00" }, sizes: "Ordinary, Special" },
  "EL-33": { name: "Dead Body Cover", mrp: "850.00", sizes: "UNIVERSAL" },
  "EL-34": { name: "Oxygen Cylinder Cover", mrp: "500.00", sizes: "UNIVERSAL" },
  "EL-35": { name: "Foam Air Cushion", mrp: "3,500.00", sizes: "UNIVERSAL" },
  "EL-36": { name: "Gym Ball", mrp: { "45 CM": "1,400.00", "55 CM": "1,400.00", "65 CM": "1,400.00", "75 CM": "1,700.00", "85 CM": "1,700.00", "95 CM": "1,700.00" }, sizes: "45 CM, 55 CM, 65 CM, 75 CM, 85 CM, 95 CM" },
  "EL-37": { name: "Hot & Cold Ice Bag Caretouch", mrp: "299.00", sizes: "UNIVERSAL" },
  "EL-38": { name: "Anesthetic Face Mask", mrp: "250.00", sizes: "UNIVERSAL" },
  "EL-39": { name: "Air Mattress", mrp: "5,500.00", sizes: "UNIVERSAL" },
  "EL-40": { name: "Patients Welcome Kit", mrp: "300.00", sizes: "UNIVERSAL" },

  // EM Series (Pediatric Products)
  "EM-01": { name: "Cervical Soft Collar -- Child", mrp: "300.00", sizes: "S, M, L, XL, XXL" },
  "EM-02": { name: "Philadelphia Collar -- Child", mrp: "1,000.00", sizes: "S, M, L, XL, XXL" },
  "EM-03": { name: "Pouch Arm Sling Tropical -- Child", mrp: "350.00", sizes: "S, M, L, XL, XXL" },
  "EM-04": { name: "Shoulder Immobilizer -- Child", mrp: "680.00", sizes: "S, M, L, XL, XXL" },
  "EM-05": { name: "Clavicle Brace -- Child", mrp: "425.00", sizes: "S, M, L, XL, XXL" },
  "EM-06": { name: "Pouch Arm Sling Baggy -- Child", mrp: "350.00", sizes: "S, M, L, XL, XXL" },
  "EM-07": { name: "Knee Immobilizer -- Child", mrp: "780.00", sizes: "S, M, L, XL, XXL" },
  "EM-08": { name: "Child Walker with Wheel", mrp: "2,050.00", sizes: "S, M, L, XL, XXL" },
  "EM-09": { name: "Child Walker without Wheel", mrp: "1,800.00", sizes: "S, M, L, XL, XXL" },
  "EM-10": { name: "AFO Night Splint -- Child", mrp: "3,500.00", sizes: "UNIVERSAL" }
};

// Loop through each product and apply the audited values
for (const code in auditedCatalog) {
  const audited = auditedCatalog[code];
  if (products[code]) {
    const original = products[code];
    // Only update these specified fields, preserving desc, img, cat, etc.
    original.name = audited.name;
    original.mrp = audited.mrp;
    original.sizes = audited.sizes;
  } else {
    // Insert new product cleanly
    products[code] = {
      name: audited.name,
      desc: code.startsWith('EM') ? "Pediatric specialized care and orthopedic support for children" : "Premium orthopedic support product",
      mrp: audited.mrp,
      sizes: audited.sizes,
      img: `/images/products/${code}.jpg`,
      cat: code.startsWith('EM') ? "child-care" : "allied"
    };
    if (code === 'EM-10') {
      products[code].desc = "Pediatric ankle foot orthosis night splint for children";
    }
  }
}

// Write the updated PRODUCTS constant back as formatted JSON
const updatedContent = `export const PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync('./data/products.js', updatedContent, 'utf8');
console.log("Successfully aligned active products catalog in products.js!");
