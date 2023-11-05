import { Details } from '../../types/types';
import './ProductDetails.css';

interface DetailsProps {
  details: Details;
}
export default function ProductDetails({ details }: DetailsProps) {
  return (
    <div className="item">
      <div>
        <h2>{details.title}</h2>
        <h3>Brand: {details.brand}</h3>
        <h3>Descriptoin: {details.description}</h3>
        <ul className="item__props-list">
          <li className="item__prop">Category: {details.category}</li>
        </ul>
      </div>
      <div className="image-container">
        <img src={details.images[0]} alt={details.title} />
      </div>
    </div>
  );
}
