import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DealersType,
  DealerProductsType,
  ProductRelationItem,
  DealerCardType,
  OwnerProductsMatchType,
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
      { limit: number; page_size: number }
    >({
      query: ({ limit, page_size }) =>
        `dealer-products/?limit=${limit}&page_size=${page_size}`,
    }),

    getDealerProductId: build.query<DealerCardType, { id: number }>({
      query: ({ id }) => `/dealer-products/${id}/`,
    }),
    filterDealerProducts: build.query<DealerProductsType, any>({
      query: ({
        dealer_id,
        matched,
        days,
        postponed,
        limit,
        page_size = 20,
      }) => ({
        url: `dealer-products/`,
        params: {
          limit,
          page_size,
          dealer_id,
          matched,
          days,
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
    getOwnerProductsMatchById: build.query<
      OwnerProductsMatchType,
      { id: number }
    >({
      query: ({ id }) => `/owner-products/match_product/${id}/`,
    }),
    updateDealerProductsStatus: build.mutation<DealerCardType, { id: number }>({
      query: (currentItem) => ({
        url: `/dealer-products/${currentItem.id}/set_postponed/`,
        method: 'PATCH',
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
  useGetOwnerProductsMatchByIdQuery,
  useUpdateDealerProductsStatusMutation,
} = api;
