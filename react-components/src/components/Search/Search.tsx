import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../state/store';
import { setSearchValue } from '../../state/searchValue/searchValueSlice';
import styles from './Search.module.css';

export default function Search() {
  const router = useRouter();
  const searchValue = router.query.search || '';
  const [currentSearchValue, setCurrentSearchValue] = useState(searchValue);

  const dispatch = useDispatch<AppDispatch>();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setCurrentSearchValue(value);
  }

  useEffect(() => {
    dispatch(setSearchValue(currentSearchValue.toString()));
  }, [router.query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: currentSearchValue },
    });
  };

  return (
    <form className={styles.search} onSubmit={(event) => handleSubmit(event)}>
      <input
        className={styles.input}
        type="text"
        value={currentSearchValue}
        onChange={handleInputChange}
      />

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}
