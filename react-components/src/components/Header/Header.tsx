import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import ErrorButton from '../errorBoundary/errorButton';
import ItemsAmount from '../itemsAmount/ItemsAmount';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Search />
      <div className={classes.pageSettings}>
        <Pagination />
        <ItemsAmount />
        <ErrorButton />
      </div>
    </header>
  );
}
