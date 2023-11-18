import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { Details } from '../../types/types';
import closeIcon from '../../assets/icons/Close.svg';
import Loader from '../Loader/Loader';
import './ProductDetails.css';
import { setDetailsLoadingState } from '../../state/detailsLoadingState/detailsLoadingState';

interface DetailsProps {
  productId: number;
  handleClick: () => void;
  styleClasses: string;
}

export default function ProductDetails({
  productId,
  handleClick,
  styleClasses,
}: DetailsProps) {
  const [details, setDetails] = useState<Details>();

  const isLoading = useSelector(
    (state: RootState) => state.detailsLoadingState.isLoading
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        dispatch(setDetailsLoadingState(true));
        const url = `https://dummyjson.com/products/${productId}`;
        const response = await fetch(url);
        const productDetails: Details = await response.json();
        setDetails(productDetails);
        dispatch(setDetailsLoadingState(false));
      } catch (error) {
        console.error('Ошибка при получении деталей продукта:', error);
      }
    }

    fetchProductDetails();
  }, [productId]);

  return (
    <div className={styleClasses}>
      {isLoading && <Loader />}
      {details && (
        <>
          <div className="details__button" onClick={handleClick}>
            <img src={closeIcon} alt="close" />
          </div>
          <div>
            <h2>{details.title}</h2>
            <p>Brand: {details.brand}</p>
            <p>Description: {details.description}</p>
            <p className="item__prop">Category: {details.category}</p>
          </div>
          <div className="image-container">
            <img src={details.images[0]} alt={details.title} />
          </div>
        </>
      )}
    </div>
  );
}
