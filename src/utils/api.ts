import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://213.171.4.71:8000/api/v1/' }),
  endpoints: (build) => ({
    getDealers: build.query<any, void>({
      query: () => 'dealer-names/',
    }),
    getDealerProducts: build.query<any, { start: number; size: number }>({
      query: ({ start = 1, size = 20 }) =>
        `dealer-products/?limit=${start}&page_size=${size}`,
      transformResponse: (response: any) => response.results,
    }),
    getDealerProductId: build.query<any, { id: number }>({
      query: ({ id }) => `/dealer-products/${id}/`,
    }),
    filterDealerProducts: build.query<any, any>({
      query: ({ dealer_id, matched, date, page_size = 20 }) => ({
        url: `dealer-products/`,
        params: {
          dealer_id,
          matched,
          date,
          page_size,
        },
      }),
      transformResponse: (response: any) => response.results,
    }),
  }),
});

export const {
  useGetDealersQuery,
  useGetDealerProductsQuery,
  useGetDealerProductIdQuery,
  useLazyFilterDealerProductsQuery,
} = api;
