import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { useAppContext } from '../context/appContext';
import ProductDetails from '../ProductDetails/ProductDetails';
import { RootState } from '../../state/store';
import './ProductList.css';
import Loader from '../Loader/Loader';

export default function ProductList() {
  const [isDetailsVisible, setDetailsVisibility] = useState(false);
  const [cardID, setCardID] = useState(0);

  const isLoading = useSelector(
    (state: RootState) => state.productListLoadingState.isLoading
  );

  const { results, currentPage } = useAppContext();

  const navigate = useNavigate();

  const hideDetails = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setDetailsVisibility(false);
    }
  };

  useEffect(() => {
    if (isDetailsVisible) {
      navigate(`/products/?page=${currentPage}&productID=${cardID}`);
    } else {
      navigate(`/products/?page=${currentPage}`);
    }
  }, [isDetailsVisible, cardID]);

  return (
    <>
      <section className="results" onClick={hideDetails}>
        {isLoading && <Loader />}
        {!isLoading && !results.length && (
          <p className="no-results">No results</p>
        )}
        {results.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            clickHandler={() => {
              setCardID(product.id);
              setDetailsVisibility(!isDetailsVisible);
            }}
          />
        ))}
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
