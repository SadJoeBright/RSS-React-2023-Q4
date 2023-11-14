import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import './ItemsAmount.css';

export default function ItemsAmount() {
  const { setItemsPerPage, itemsPerPage, setCurrentPage } = useAppContext();
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    setItemsPerPage(selectedValue);
    localStorage.setItem('itemsPerPage', selectedValue.toString());

    setCurrentPage(1);
    navigate('products/?page=1');
  };

  return (
    <div>
      <select
        placeholder="Per page"
        className="items-amount"
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
