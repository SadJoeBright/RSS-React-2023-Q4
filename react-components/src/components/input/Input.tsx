import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Data, Product } from '../../types/types';
import './input.css';

interface InputProps {
  updateResults: (results: Product[]) => void;
  currentPage: number;
  itemsPerPage: number;
}

export default function Input({
  updateResults,
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
    updateResults(data.products);
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
    <>
      <input
        className="input"
        type="text"
        placeholder="Enter starship's name"
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

      {isLoading && (
        <div className="spinner">
          <ColorRing
            visible
            height={80}
            width={80}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </>
  );
}
