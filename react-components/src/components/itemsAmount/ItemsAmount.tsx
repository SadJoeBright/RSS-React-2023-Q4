// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAppContext } from '../../context/appContext';
import { RootState, AppDispatch } from '../../state/store';
import { setItemsPerPage } from '../../state/itemsPerPage/itemsPerPageSlice';
import styles from './ItemsAmount.module.css';

export default function ItemsAmount() {
  const { setCurrentPage } = useAppContext();

  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );

  const dispatch = useDispatch<AppDispatch>();

  // const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    dispatch(setItemsPerPage(selectedValue));
    localStorage.setItem('itemsPerPage', selectedValue.toString());

    setCurrentPage(1);
    // navigate('products/?page=1');
  };

  return (
    <div>
      <select
        placeholder="Per page"
        className={styles.itemsAmount}
        onChange={handleSelectChange}
        value={itemsPerPage}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
