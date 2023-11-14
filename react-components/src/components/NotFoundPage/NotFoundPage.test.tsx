import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, describe, expect } from 'vitest';
import App from '../../App';
import { AppProvider } from '../context/appContext';

describe('NotFoundPage test', () => {
  it('Render NotFoundPage component', () => {
    render(
      <MemoryRouter initialEntries={['/non-existing-route']}>
        <AppProvider>
          <App />
        </AppProvider>
      </MemoryRouter>
    );
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).not.toEqual(null);
  });
});
