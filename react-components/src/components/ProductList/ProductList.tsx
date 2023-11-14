import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';
import { useAppContext } from '../context/appContext';
import ProductDetails from '../ProductDetails/ProductDetails';

export default function ProductList() {
  const [isDetailsVisible, setDetailsVisibility] = useState(false);
  const [cardID, setCardID] = useState(0);

  const { results } = useAppContext();

  // const navigate = useNavigate();

  const hideDetails = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setDetailsVisibility(false);
    }
  };

  // useEffect(() => {
  //   if (isDetailsVisible) {
  //     navigate(`/products/page=${currentPage}&productID=${cardID}`);
  //   } else {
  //     navigate(`/products/page=${currentPage}`);
  //   }
  // }, [isDetailsVisible, cardID]);

  return (
    <>
      <section className="results" onClick={hideDetails}>
        {results?.length ? (
          results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              clickHandler={() => {
                setCardID(product.id);
                setDetailsVisibility(!isDetailsVisible);
              }}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </section>
      {isDetailsVisible && (
        <ProductDetails
          handleClick={() => setDetailsVisibility(false)}
          productId={cardID}
        />
      )}
    </>
  );
}
