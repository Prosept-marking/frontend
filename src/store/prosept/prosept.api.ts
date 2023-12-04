import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductRelationItem } from '../../models/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://prosept.hopto.org/api/v1/' }),
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
    getProductRelationId: build.query<any, { id: number }>({
      query: ({ id }) => `/product-relation/${id}/`,
    }),
    createProductRelation: build.mutation<
      ProductRelationItem,
      ProductRelationItem
    >({
      query: (relationItem) => ({
        url: `/product-relation/`,
        method: 'POST',
        body: [relationItem],
      }),
    }),
    deleteProductRelationId: build.mutation<
      ProductRelationItem,
      ProductRelationItem
    >({
      query: (relationItem) => ({
        url: `/product-relation/${relationItem.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDealersQuery,
  useGetDealerProductsQuery,
  useGetDealerProductIdQuery,
  useLazyFilterDealerProductsQuery,
  useGetProductRelationIdQuery,
  useCreateProductRelationMutation,
  useDeleteProductRelationIdMutation,
} = api;
