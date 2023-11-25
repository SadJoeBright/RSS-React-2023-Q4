/* eslint-disable react/jsx-no-constructed-context-values */
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Product } from '../types/types';

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

    const router = useRouter();
    const urlPage = router.query.page;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      setCurrentPage(Number(urlPage) || 1);
    }, [urlPage]);

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
