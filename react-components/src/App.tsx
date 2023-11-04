// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import ErrorButton from './components/ErrorBoundary/errorButton';
import { Product } from './types/types';
import Pagination from './components/Pagination/Pagination';
import ProductList from './components/Results/ProductList';
import Input from './components/input/input';
import ItemsAmount from './components/itemsAmount/itemsAmount';

function App() {
  const [results, setResults] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const updateResults = (newResults: Product[]) => {
    setResults(newResults);
  };

  const toTheFirstPage = () => {
    setCurrentPage(1);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < 100 / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    setCurrentPage(100 / itemsPerPage);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setItemsPerPage(selectedValue);
  };

  return (
    // <BrowserRouter>
    <>
      <ErrorButton />
      <Input
        updateResults={updateResults}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
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
      <ProductList results={results} />
    </>
    // </BrowserRouter>
  );
}

export default App;
