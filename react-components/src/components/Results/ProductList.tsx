import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { Product } from '../../types/types';

interface ResultsProps {
  products: Product[];
}

export default function ProductList({ products }: ResultsProps) {
  return (
    <section className="results">
      {products?.length ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No results</p>
      )}
    </section>
  );
}
