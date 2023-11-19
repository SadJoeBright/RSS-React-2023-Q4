import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { useAppContext } from '../context/appContext';
import ProductDetails from '../ProductDetails/ProductDetails';
import { RootState } from '../../state/store';
import './ProductList.css';
import Loader from '../Loader/Loader';
import { useGetProductsQuery } from '../../state/appApi';
import { Product } from '../../types/types';

export default function ProductList() {
  const [isDetailsVisible, setDetailsVisibility] = useState(false);
  const [cardID, setCardID] = useState(0);
  const [detailsStyleClasses, setDetailsStyleClasses] = useState('details');

  // const isLoading = useSelector(
  //   (state: RootState) => state.productListLoadingState.isLoading
  // );

  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );

  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const { currentPage } = useAppContext();

  const { data, isFetching } = useGetProductsQuery({
    searchValue,
    itemsPerPage,
    currentPage,
  });

  const navigate = useNavigate();

  const hideDetails = () => {
    setDetailsStyleClasses('details');

    setTimeout(() => {
      setDetailsVisibility(false);
    }, 300);
  };

  const showDetails = () => {
    setDetailsVisibility(true);
    setTimeout(() => {
      setDetailsStyleClasses('details details_visible');
    });
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
      <section
        className="results"
        onClick={() => {
          if (isDetailsVisible) {
            hideDetails();
          }
        }}
      >
        {isFetching && <Loader />}
        {!data?.products.length && <p className="no-results">No results</p>}
        {data &&
          data.products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              clickHandler={() => {
                setCardID(product.id);
                showDetails();
              }}
            />
          ))}
      </section>
      {isDetailsVisible && (
        <ProductDetails
          handleClick={hideDetails}
          productId={cardID}
          styleClasses={detailsStyleClasses}
        />
      )}
    </>
  );
}
