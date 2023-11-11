import Pagination from '../Pagination/Pagination';
import Input from '../input/Input';
import ItemsAmount from '../itemsAmount/ItemsAmount';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Input />
      <div className={classes.pageSettings}>
        <Pagination />
        <ItemsAmount />
      </div>
    </header>
  );
}
