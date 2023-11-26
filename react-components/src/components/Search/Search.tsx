import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Search.module.css';

export default function Search() {
  const router = useRouter();

  const searchValue = router.query.search || '';
  const [currentSearchValue, setCurrentSearchValue] = useState(searchValue);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setCurrentSearchValue(value);
  }

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
