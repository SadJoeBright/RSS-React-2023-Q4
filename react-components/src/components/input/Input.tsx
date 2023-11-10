import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Data } from '../../types/types';
import './input.css';
import Loader from '../Loader/Loader';

interface InputProps {
  updateData: (data: Data) => void;
  currentPage: number;
  itemsPerPage: number;
}

export default function Input({
  updateData,
  currentPage,
  itemsPerPage,
}: InputProps) {
  const [searchValue, setSearchValue] = useState(
    window.localStorage.getItem('searchValue') || ''
  );

  const [isLoading, setLoadingState] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchValue(value);
    window.localStorage.setItem('searchValue', value);
  }

  async function getData(value: string): Promise<void> {
    setLoadingState(true);
    const url = `https://dummyjson.com/products/search?q=${value}&limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    const response = await fetch(url);
    const data: Data = await response.json();
    updateData(data);
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
