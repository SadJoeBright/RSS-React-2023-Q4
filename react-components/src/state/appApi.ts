import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data, Details } from '../types/types';

interface RequestParams {
  searchValue: string;
  itemsPerPage: number;
  currentPage: number;
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Data, RequestParams>({
      query: ({ searchValue, itemsPerPage, currentPage }) =>
        `search?q=${searchValue}&limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }`,
    }),

    getDetails: builder.query<Details, number>({
      query: (productId) => `${productId}`,
    }),
  }),
});

export const { useGetProductsQuery } = appApi;
export const { useGetDetailsQuery } = appApi;
