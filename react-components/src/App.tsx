import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { Data, Product } from './types/types';
import ProductList from './components/Results/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';

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

  const updatePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    navigate(`products/page=${currentPage}`);
  }, [itemsTotalCount, itemsPerPage]);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const currentPageSegment = pathSegments[pathSegments.length - 1];
    const newPage = parseInt(currentPageSegment.replace('page=', ''), 10);
    setCurrentPage(newPage);
  }, [window.location.pathname]);

  const handleItemsPerPageChange = (selectedValue: number) => {
    setItemsPerPage(selectedValue);
  };

  const setID = (id: number) => {
    setCardID(id);
  };

  const showDetails = () => {
    setDetailsVisibility(!isDetailsVisible);
  };

  useEffect(() => {
    if (isDetailsVisible) {
      navigate(`products/page=${currentPage}&productID=${cardID}`);
    } else {
      navigate(`products/page=${currentPage}`);
    }
  }, [isDetailsVisible, currentPage, cardID]);

  const hideDetails = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      navigate(`products/page=${currentPage}`);
      setDetailsVisibility(false);
    }
  };

  return (
    <>
      <Header
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        itemsTotalCount={itemsTotalCount}
        onChange={handleItemsPerPageChange}
        updatePageNumber={updatePageNumber}
        updateData={updateData}
      />
      <main>
        <Routes>
          <Route
            path="products/page=:currentPage"
            element={
              <ProductList
                products={results}
                clickHandler={showDetails}
                hideDetails={hideDetails}
                setID={setID}
              />
            }
          />
        </Routes>

        {isDetailsVisible && (
          <ProductDetails clickHandler={showDetails} id={cardID} />
        )}
      </main>
    </>
  );
}

export default App;
