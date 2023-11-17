import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Data } from '../../types/types';
import './Search.css';
import Loader from '../Loader/Loader';
import { useAppContext } from '../context/appContext';
import { AppDispatch, RootState } from '../../state/store';
import { setSearchValue } from '../../state/searchValue/searchValueSlice';

export default function Search() {
  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );
  const dispatch = useDispatch<AppDispatch>();

  const { currentPage, itemsPerPage, setResults, setItemsTotalCount } =
    useAppContext();

  const [isLoading, setLoadingState] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    dispatch(setSearchValue(value));
    window.localStorage.setItem('searchValue', value);
  }

  async function getData(value: string): Promise<void> {
    setLoadingState(true);
    const url = `https://dummyjson.com/products/search?q=${value}&limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    const response = await fetch(url);
    const data: Data = await response.json();
    setResults(data.products);
    setItemsTotalCount(data.total);
    setLoadingState(false);
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

      {isLoading && <Loader />}
    </div>
  );
}
