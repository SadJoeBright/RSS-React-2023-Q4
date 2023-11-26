/* eslint-disable global-require */
import { describe, it, beforeAll, vi, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import mockRouter from 'next-router-mock';
import NotFoundPage from '../../pages/404';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
});

describe('Tests for the 404 Page component', async () => {
  it('Render 404 Page correctly', async () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('Mocks the useRouter hook and back to the main page', () => {
    render(<NotFoundPage />);
    fireEvent.click(screen.getByRole('go-back-button'));
    waitFor(() => {
      expect(mockRouter.asPath).toEqual('/?pageNumber=1&pageSize=10&search=');
    });
  });
});
