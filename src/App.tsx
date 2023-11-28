import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/Mainpage';
import UncontrolledForm from './components/UcontrolledForm';
import ReactHookForm from './components/ReactHookForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolledForm" element={<UncontrolledForm />} />
        <Route path="/reactHookForm" element={<ReactHookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
