import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, describe } from 'vitest';
import Search from './Search';
import { AppProvider } from '../context/appContext';

describe('Search component', () => {
  it('handles input changes and clicking search button', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Search />
        </AppProvider>
      </BrowserRouter>
    );

    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    const searchButton = screen.getByText('Search');
    fireEvent.change(inputElement, { target: { value: 'Search value' } });
    screen.debug();
    expect(inputElement.value).toBe('Search value');
    fireEvent.click(searchButton);
  });

  it('Verify that clicking the Search button saves the entered value to the local storage;', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Search />
        </AppProvider>
      </BrowserRouter>
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Search value' } });

    const localStorageValue = localStorage.getItem('searchValue');
    expect(localStorageValue).toBe('Search value');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Search />
        </AppProvider>
      </BrowserRouter>
    );

    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    expect(inputElement.value).toBe('Search value');

    const localStorageValue = localStorage.getItem('searchValue');
    expect(localStorageValue).toBe('Search value');
  });
});
