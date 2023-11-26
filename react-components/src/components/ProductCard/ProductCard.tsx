import { Product } from '../../types/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  clickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ProductCard({
  product,
  clickHandler,
}: ProductCardProps) {
  return (
    <div className={styles.card} onClick={clickHandler}>
      <h4>{product.title}</h4>
      <div className={styles.card__imageContainer}>
        <img
          className={styles.card__image}
          src={product.images[0]}
          alt={product.title}
        />
      </div>
    </div>
  );
}
