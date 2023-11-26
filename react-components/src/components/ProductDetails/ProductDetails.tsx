import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import closeIcon from '../../assets/icons/Close.svg';
import Loader from '../Loader/Loader';
import { setDetailsLoadingState } from '../../state/detailsLoadingState/detailsLoadingState';
import { useGetDetailsQuery } from '../../state/appApi';
import styles from './ProductDetails.module.css';

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
  const { data, isFetching } = useGetDetailsQuery(productId);

  const isLoading = useSelector(
    (state: RootState) => state.detailsLoadingState.isLoading
  );

  const dispatch = useDispatch<AppDispatch>();
  dispatch(setDetailsLoadingState(isFetching));

  return (
    <div className={styleClasses}>
      {isLoading && <Loader />}
      {data && (
        <>
          <div className={styles.details__button} onClick={handleClick}>
            <img src={closeIcon.src} alt="close" />
          </div>
          <div className={styles.details__container}>
            <div className={styles.details__imageContainer}>
              <img
                className={styles.details__image}
                src={data.images[0]}
                alt={data.title}
              />
            </div>
            <div className={styles.details__content}>
              <h2>{data.title}</h2>
              <p>{data.brand}</p>
              <p>{data.description}</p>
              <p>{data.category}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
