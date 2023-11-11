import { useAppContext } from '../context/appContext';
import './ItemsAmount.css';

export default function ItemsAmount() {
  const { setItemsPerPage } = useAppContext();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    setItemsPerPage(selectedValue);
  };

  return (
    <div>
      <select
        placeholder="Per page"
        className="items-amount"
        onChange={handleSelectChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
