import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './components/Results/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import { useAppContext } from './components/context/appContext';

function App() {
  const [isDetailsVisible, setDetailsVisibility] = useState(false);
  const [cardID, setCardID] = useState(0);

  const { itemsTotalCount, currentPage, setCurrentPage, itemsPerPage } =
    useAppContext();

  const navigate = useNavigate();

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
      <Header />
      <main>
        <Routes>
          <Route
            path="products/page=:currentPage"
            element={
              <ProductList
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
