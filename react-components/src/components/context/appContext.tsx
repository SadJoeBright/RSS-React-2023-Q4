/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/types';

interface AppContextProps {
  results: Product[];
  itemsTotalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setResults: React.Dispatch<React.SetStateAction<Product[]>>;
  setItemsTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> =
  function AppProvider({ children }) {
    const [results, setResults] = useState<Product[]>([]);
    const [itemsTotalCount, setItemsTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(
      Number(localStorage.getItem('itemsPerPage')) || 5
    );

    const [searchParams] = useSearchParams();
    const urlPage = Number(searchParams.get('page'));

    const [currentPage, setCurrentPage] = useState(urlPage || 1);

    useEffect(() => {
      setCurrentPage(urlPage || 1);
    }, [searchParams]);

    console.log(searchParams.get('page'));

    return (
      <AppContext.Provider
        value={{
          results,
          setResults,
          itemsTotalCount,
          setItemsTotalCount,
          currentPage,
          setCurrentPage,
          itemsPerPage,
          setItemsPerPage,
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
