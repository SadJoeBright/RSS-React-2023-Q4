import { useState } from 'react';
import './App.css';
import Input from './components/input/input';
import Results from './components/results/results';
import ErrorBoundary from './components/errorBoundary/errorBounadary';
import ErrorButton from './components/errorBoundary/errorButton';
import { Product } from './types/types';

function App() {
  const [results, setResults] = useState<Product[]>([]);

  const updateResults = (newResults: Product[]) => {
    setResults(newResults);
  };

  return (
    <ErrorBoundary>
      <ErrorButton />
      <Input updateResults={updateResults} />
      <Results results={results} />
    </ErrorBoundary>
  );
}

export default App;
