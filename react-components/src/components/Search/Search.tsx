import { useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Data } from '../../types/types';
import { useAppContext } from '../context/appContext';
import { AppDispatch, RootState } from '../../state/store';
import { setSearchValue } from '../../state/searchValue/searchValueSlice';
import { setProductListLoadingState } from '../../state/productListLoadingState/productListLoadingState';
import './Search.css';

export default function Search() {
  const { currentPage, setResults, setItemsTotalCount } = useAppContext();

  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const itemsPerPage = useSelector(
    (state: RootState) => state.itemsPerPage.itemsPerPage
  );

  const dispatch = useDispatch<AppDispatch>();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    dispatch(setSearchValue(value));
    window.localStorage.setItem('searchValue', value);
  }

  async function getData(value: string): Promise<void> {
    dispatch(setProductListLoadingState(true));
    const url = `https://dummyjson.com/products/search?q=${value}&limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    const response = await fetch(url);
    const data: Data = await response.json();
    setResults(data.products);
    setItemsTotalCount(data.total);
    dispatch(setProductListLoadingState(false));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      getData(searchValue);
    }
  }

  useEffect(() => {
    getData(searchValue);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="search">
      <input
        className="input"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="search-button"
        onClick={() => getData(searchValue)}
      >
        Search
      </button>
    </div>
  );
}
