import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainPage from './pages/Mainpage';
import UncontrolledForm from './components/UncontrolledForm/UcontrolledForm';
import ReactHookForm from './components/ReactHookForm';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uncontrolledForm" element={<UncontrolledForm />} />
          <Route path="/reactHookForm" element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
