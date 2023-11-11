// import { Data } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import Input from '../input/Input';
import ItemsAmount from '../itemsAmount/ItemsAmount';
import classes from './Header.module.css';

interface HederProps {
  currentPage: number;
  itemsPerPage: number;
  itemsTotalCount: number;
  // updateData: (data: Data) => void;
  onChange: (selectedValue: number) => void;
  updatePageNumber: (page: number) => void;
}

export default function Header({
  currentPage,
  itemsPerPage,
  itemsTotalCount,
  // updateData,
  onChange,
  updatePageNumber,
}: HederProps) {
  return (
    <header className={classes.header}>
      <Input
        // updateData={updateData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <div className={classes.pageSettings}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          itemsTotalCount={itemsTotalCount}
          updatePageNumber={updatePageNumber}
        />
        <ItemsAmount onChange={onChange} />
      </div>
    </header>
  );
}
