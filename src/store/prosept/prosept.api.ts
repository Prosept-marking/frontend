import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DealersType,
  DealerProductsType,
  ProductRelationItem,
  DealerCardType,
} from '../../models/models';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://prosept.hopto.org/api/v1/' }),
  endpoints: (build) => ({
    getDealers: build.query<DealersType, void>({
      query: () => 'dealer-names/',
    }),
    getDealerProducts: build.query<
      DealerProductsType,
      { start: number; page_size: number }
    >({
      query: ({ start = 1, page_size = 20 }) =>
        `dealer-products/?limit=${start}&page_size=${page_size}`,
    }),

    getDealerProductId: build.query<DealerCardType, { id: number }>({
      query: ({ id }) => `/dealer-products/${id}/`,
    }),
    filterDealerProducts: build.query<DealerProductsType, any>({
      query: ({ dealer_id, matched, days, postponed, page_size = 20 }) => ({
        url: `dealer-products/`,
        params: {
          dealer_id,
          matched,
          days,
          page_size,
          postponed,
        },
      }),
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
