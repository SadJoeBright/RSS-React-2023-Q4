import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Details } from '../../types/types';
import './ProductDetails.css';
import closeIcon from '../../assets/icons/Close.svg';
import Loader from '../Loader/Loader';

interface DetailsProps {
  productId: number;
  handleClick: () => void;
}

export default function ProductDetails({
  productId,
  handleClick,
}: DetailsProps) {
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const url = `https://dummyjson.com/products/${productId}`;
        const response = await fetch(url);
        const productDetails: Details = await response.json();
        setDetails(productDetails);
      } catch (error) {
        console.error('Ошибка при получении деталей продукта:', error);
      }
    }

    fetchProductDetails();
  }, [productId]);

  if (!details) {
    return <Loader />;
  }

  return (
    <div className="details">
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
    </div>
  );
}
