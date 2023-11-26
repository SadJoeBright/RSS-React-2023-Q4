import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppDispatch } from '../../state/store';
import { setItemsPerPage } from '../../state/itemsPerPage/itemsPerPageSlice';
import styles from './ItemsAmount.module.css';

export default function ItemsAmount() {
  const router = useRouter();
  const itemsPerPage = Number(router.query.size) || 5;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (router.query.size) {
      dispatch(setItemsPerPage(Number(router.query.size)));
    }
  }, [router.query.size]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, size: selectedValue },
    });
    dispatch(setItemsPerPage(selectedValue));
    localStorage.setItem('itemsPerPage', selectedValue.toString());
  };

  return (
    <div>
      <select
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
