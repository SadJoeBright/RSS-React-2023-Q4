import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { useAppContext } from '../context/appContext';

interface ResultsProps {
  clickHandler: () => void;
  hideDetails: (event: React.MouseEvent) => void;
  setID: (id: number) => void;
}

export default function ProductList({
  clickHandler,
  setID,
  hideDetails,
}: ResultsProps) {
  const handleProductClick = (id: number) => {
    setID(id);
    clickHandler();
  };

  const { results } = useAppContext();

  return (
    <section className="results" onClick={hideDetails}>
      {results?.length ? (
        results.map((product) => (
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
