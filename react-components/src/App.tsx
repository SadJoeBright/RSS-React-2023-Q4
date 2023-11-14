import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import Header from './components/Header/Header';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products/" element={<ProductList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
