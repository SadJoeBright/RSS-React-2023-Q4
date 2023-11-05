import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/types';

interface ResultsProps {
  products: Product[];
  clickHandler: () => void;
  setID: (id: number) => void;
}

export default function ProductList({
  products,
  clickHandler,
  setID,
}: ResultsProps) {
  const handleProductClick = (id: number) => {
    setID(id);
    clickHandler();
  };

  return (
    <section className="results">
      {products?.length ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            clickHandler={() => handleProductClick(product.id)}
          />
        ))
      ) : (
        <p>No results</p>
      )}
    </section>
  );
}
