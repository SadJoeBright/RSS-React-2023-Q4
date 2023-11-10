import './ItemsAmount.css';

interface ItemsAmountProps {
  itemsPerPage: number;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ItemsAmount({
  itemsPerPage,
  handleSelectChange,
}: ItemsAmountProps) {
  return (
    <div>
      {/* Per page: */}
      <select
        placeholder="Per page"
        className="items-amount"
        value={itemsPerPage}
        onChange={handleSelectChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
