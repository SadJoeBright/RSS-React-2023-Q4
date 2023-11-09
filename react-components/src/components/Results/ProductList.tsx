import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/types';
import './ProductList.css';

interface ResultsProps {
  products: Product[];
  clickHandler: () => void;
  hideDetails: (event: React.MouseEvent) => void;
  setID: (id: number) => void;
}

export default function ProductList({
  products,
  clickHandler,
  setID,
  hideDetails,
}: ResultsProps) {
  const handleProductClick = (id: number) => {
    setID(id);
    clickHandler();
  };

  return (
    <section className="results" onClick={hideDetails}>
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
