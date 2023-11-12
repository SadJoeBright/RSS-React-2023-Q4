import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="products/page=:currentPage" element={<ProductList />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
