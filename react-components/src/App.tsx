// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import ErrorButton from './components/ErrorBoundary/errorButton';
import { Data, Product } from './types/types';
import Pagination from './components/Pagination/Pagination';
import ProductList from './components/Results/ProductList';
import Input from './components/input/Input';
import ItemsAmount from './components/itemsAmount/itemsAmount';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  const [results, setResults] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemsTotalCount, setItemsTotalCount] = useState(0);
  const [isDetailsVisible, setDetailsVisibility] = useState(false);
  const [cardID, setCardID] = useState(0);

  const updateData = (data: Data) => {
    setResults(data.products);
    setItemsTotalCount(data.total);
  };

  useEffect(() => {
    setCurrentPage(Math.ceil(itemsTotalCount / itemsPerPage));
  }, [itemsTotalCount, itemsPerPage]);

  const toTheFirstPage = () => {
    setCurrentPage(1);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toTheNextPage = () => {
    if (currentPage < itemsTotalCount / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toTheLastPage = () => {
    setCurrentPage(Math.ceil(itemsTotalCount / itemsPerPage));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setItemsPerPage(selectedValue);
  };

  const setID = (id: number) => {
    setCardID(id);
  };

  const showDetails = () => {
    setDetailsVisibility(!isDetailsVisible);
  };

  return (
    // <BrowserRouter>
    <>
      <ErrorButton />
      <Input
        updateData={updateData}
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
      <main>
        <ProductList
          products={results}
          clickHandler={showDetails}
          setID={setID}
        />
        {isDetailsVisible && (
          <ProductDetails clickHandler={showDetails} id={cardID} />
        )}
      </main>
    </>
    // </BrowserRouter>
  );
}

export default App;
