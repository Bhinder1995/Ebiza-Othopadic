import { PRODUCTS } from '@/data/products';

export default function DiagPage() {
  const products = Object.entries(PRODUCTS);
  return (
    <div style={{padding: '20px'}}>
      <h1>Image Diagnostic ({products.length} products)</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px'}}>
        {products.map(([code, p]) => (
          <div key={code} style={{border: '1px solid #ccc', padding: '10px'}}>
            <div style={{fontSize: '10px'}}>{code}</div>
            <img 
              src={p.img} 
              alt={p.name} 
              style={{width: '100%', height: '100px', objectFit: 'contain'}} 
              onError={(e) => e.currentTarget.style.border = '2px solid red'}
            />
            <div style={{fontSize: '10px'}}>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
