/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  // useEffect,
} from 'react';
// import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/types';

interface AppContextProps {
  results: Product[];
  currentPage: number;
  setResults: React.Dispatch<React.SetStateAction<Product[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> =
  function AppProvider({ children }) {
    const [results, setResults] = useState<Product[]>([]);

    // const [searchParams] = useSearchParams();
    // const urlPage = Number(searchParams.get('page'));

    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //   setCurrentPage(urlPage || 1);
    // }, [searchParams]);

    return (
      <AppContext.Provider
        value={{
          results,
          setResults,
          currentPage,
          setCurrentPage,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext должен использоваться в пределах AppProvider'
    );
  }
  return context;
};
