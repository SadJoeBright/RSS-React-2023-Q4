import { useState, useEffect } from 'react';
import { Details } from '../../types/types';
import './ProductDetails.css';
import Loader from '../Loader/Loader';

interface DetailsProps {
  id: number;
  clickHandler: () => void;
}

export default function ProductDetails({ id, clickHandler }: DetailsProps) {
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const url = `https://dummyjson.com/products/${id}`;
        const response = await fetch(url);
        const productDetails: Details = await response.json();
        setDetails(productDetails);
      } catch (error) {
        console.error('Ошибка при получении деталей продукта:', error);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (!details) {
    return <Loader />;
  }

  return (
    <div className="details">
      <div>
        <h2>{details.title}</h2>
        <h3>Brand: {details.brand}</h3>
        <h3>Description: {details.description}</h3>
        <ul className="item__props-list">
          <li className="item__prop">Category: {details.category}</li>
        </ul>
      </div>
      <div className="image-container">
        <img src={details.images[0]} alt={details.title} />
      </div>
      <button type="button" onClick={clickHandler}>
        Close
      </button>
    </div>
  );
}
