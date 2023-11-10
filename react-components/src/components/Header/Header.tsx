import { Data } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import Input from '../input/Input';
import ItemsAmount from '../itemsAmount/itemsAmount';
import classes from './Header.module.css';

interface HederProps {
  currentPage: number;
  itemsPerPage: number;
  updateData: (data: Data) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  toTheFirstPage: () => void;
  toThePrevPage: () => void;
  toTheNextPage: () => void;
  toTheLastPage: () => void;
}

export default function Header({
  currentPage,
  itemsPerPage,
  updateData,
  handleSelectChange,
  toTheFirstPage,
  toThePrevPage,
  toTheNextPage,
  toTheLastPage,
}: HederProps) {
  return (
    <header className={classes.header}>
      <Input
        updateData={updateData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <div className={classes.pageSettings}>
        <Pagination
          currentPage={currentPage}
          toTheFirstPage={toTheFirstPage}
          toThePrevPage={toThePrevPage}
          toTheNextPage={toTheNextPage}
          toTheLastPage={toTheLastPage}
        />
        <ItemsAmount
          itemsPerPage={itemsPerPage}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </header>
  );
}
