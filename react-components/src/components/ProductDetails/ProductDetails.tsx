import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import closeIcon from '../../assets/icons/Close.svg';
import Loader from '../Loader/Loader';
import { setDetailsLoadingState } from '../../state/detailsLoadingState/detailsLoadingState';
import { useGetDetailsQuery } from '../../state/appApi';
import './ProductDetails.css';

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
          <div className="details__button" onClick={handleClick}>
            <img src={closeIcon} alt="close" />
          </div>
          <div>
            <h2>{data.title}</h2>
            <p>Brand: {data.brand}</p>
            <p>Description: {data.description}</p>
            <p className="item__prop">Category: {data.category}</p>
          </div>
          <div className="image-container">
            <img src={data.images[0]} alt={data.title} />
          </div>
        </>
      )}
    </div>
  );
}
