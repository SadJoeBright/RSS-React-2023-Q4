import { Product } from '../../types/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="item">
      <h4>{product.title}</h4>
      <div className="image-container">
        <img src={product.images[0]} alt={product.title} />
      </div>
    </div>
  );
}
