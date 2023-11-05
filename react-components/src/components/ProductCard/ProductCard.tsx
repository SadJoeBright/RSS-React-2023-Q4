import { Product } from '../../types/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ProductCard({
  product,
  clickHandler,
}: ProductCardProps) {
  return (
    <div className="item" onClick={clickHandler}>
      <h4>{product.title}</h4>
      <div className="image-container">
        <img src={product.images[0]} alt={product.title} />
      </div>
    </div>
  );
}
