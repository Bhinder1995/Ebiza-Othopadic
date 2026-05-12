import { PRODUCTS } from '../../data/products';
import ProductGallery from './ProductGallery';

export const metadata = {
  title: 'Products | Ebiza Orthopaedic',
  description: '200+ orthopaedic products across 14 categories. Body belts, cervical supports, knee braces, walking aids and more.',
};

export default function ProductsPage() {
  return <ProductGallery products={PRODUCTS} />;
}
