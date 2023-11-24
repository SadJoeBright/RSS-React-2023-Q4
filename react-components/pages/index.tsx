import { Provider } from 'react-redux';
import Header from '../src/components/Header/Header';
import ProductList from '../src/components/ProductList/ProductList';
import { store } from '../src/state/store';
import { AppProvider } from '../src/components/context/appContext';
import './global.module.css';

function App() {
  return (
    // <BrowserRouter>
    <AppProvider>
      <Provider store={store}>
        <Header />
        <main>
          <ProductList />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </main>
      </Provider>
    </AppProvider>
    // </BrowserRouter>
  );
}

export default App;
