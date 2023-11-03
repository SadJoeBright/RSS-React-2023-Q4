import { Product } from '../../types/types';
import './item.css';

export default function ProductCard(props: Product) {
  const { title, description, brand, category, images } = props;

  return (
    <div className="item">
      <div>
        <h2>{title}</h2>
        <h3>Brand: {brand}</h3>
        <h3>Descriptoin: {description}</h3>
        <ul className="item__props-list">
          <li className="item__prop">Category: {category}</li>
        </ul>
      </div>
      <div className="image-container">
        <img src={images[0]} alt={title} />
      </div>
    </div>
  );
}
