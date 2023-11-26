import { useRouter } from 'next/router';
import styles from './ItemsAmount.module.css';

export default function ItemsAmount() {
  const router = useRouter();

  const itemsPerPage = Number(router.query.size) || 5;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, size: selectedValue },
    });
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
