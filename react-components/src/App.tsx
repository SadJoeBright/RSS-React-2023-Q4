import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProductList from './components/ProductList/ProductList';
import Header from './components/Header/Header';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products/" element={<ProductList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
