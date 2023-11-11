/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Product } from '../../types/types';

interface AppContextProps {
  results: Product[];
  setResults: React.Dispatch<React.SetStateAction<Product[]>>;
  itemsTotalCount: number;
  setItemsTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> =
  function AppProvider({ children }) {
    const [results, setResults] = useState<Product[]>([]);
    const [itemsTotalCount, setItemsTotalCount] = useState(0);

    return (
      <AppContext.Provider
        value={{ results, setResults, itemsTotalCount, setItemsTotalCount }}
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
