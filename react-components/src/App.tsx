import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(Math.ceil(itemsTotalCount / itemsPerPage));
    navigate(`products/${currentPage}`);
  }, [itemsTotalCount, itemsPerPage]);

  const toTheFirstPage = () => {
    setCurrentPage(1);
    navigate(`products/page=1`);
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`products/page=${prevPage}`);
    }
  };

  const toTheNextPage = () => {
    const maxPage = Math.ceil(itemsTotalCount / itemsPerPage);
    if (currentPage < maxPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`products/page=${nextPage}`);
    }
  };

  const toTheLastPage = () => {
    const maxPage = Math.ceil(itemsTotalCount / itemsPerPage);
    setCurrentPage(maxPage);
    navigate(`products/page=${maxPage}`);
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
    <>
      <header>
        <ErrorButton />
        <Input
          updateData={updateData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        {results.length && (
          <Pagination
            currentPage={currentPage}
            toTheFirstPage={toTheFirstPage}
            toThePrevPage={toThePrevPage}
            toTheNextPage={toTheNextPage}
            toTheLastPage={toTheLastPage}
          />
        )}
        <ItemsAmount
          itemsPerPage={itemsPerPage}
          handleSelectChange={handleSelectChange}
        />
      </header>
      {/* <BrowserRouter> */}
      <main>
        <Routes>
          <Route
            path="products/page=:currentPage"
            element={
              <ProductList
                products={results}
                clickHandler={showDetails}
                setID={setID}
              />
            }
          />
          <Route
            path="/products/details/:id"
            element={<ProductDetails clickHandler={showDetails} id={cardID} />}
          />
          <Route index element={<Navigate to="products/page=:currentPage" />} />
        </Routes>
        <Outlet />
      </main>
      {/* </BrowserRouter> */}

      {/* <main> */}
      {/* <ProductList
          products={results}
          clickHandler={showDetails}
          setID={setID}
        /> */}
      {/* {isDetailsVisible && (
        <ProductDetails clickHandler={showDetails} id={cardID} />
      )} */}
      {/* </main> */}
    </>
  );
}

export default App;
