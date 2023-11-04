import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { Product } from '../../types/types';

interface ResultsProps {
  results: Product[];
}

export default function ProductList({ results }: ResultsProps) {
  return (
    <section className="results">
      {results?.length ? (
        results.map((item) => (
          <ProductCard
            key={item.title}
            title={item.title}
            brand={item.brand}
            category={item.category}
            description={item.description}
            images={item.images}
          />
        ))
      ) : (
        <p>No results</p>
      )}
    </section>
  );
}
