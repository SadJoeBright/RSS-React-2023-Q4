import './ItemsAmount.css';

interface ItemsAmountProps {
  onChange: (selectedValue: number) => void;
}

export default function ItemsAmount({ onChange }: ItemsAmountProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    onChange(selectedValue);
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
