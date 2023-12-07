import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DealersType,
  DealerProductsType,
  ProductRelationItem,
  DealerCardType,
  OwnerProductsMatchType,
  ProductRelationCreateType,
  DailyStatsType,
  DealerStatsDataType,
} from '../../models/models';
import { current } from 'immer';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://prosept.hopto.org/api/v1/' }),
  endpoints: (build) => ({
    getDealers: build.query<DealersType, void>({
      query: () => 'dealer-names/',
    }),
    getDailyStats: build.query<DailyStatsType, void>({
      query: () => 'daily-statistic/',
    }),
    getDealerStats: build.query<DealerStatsDataType, void>({
      query: () => 'dealers-statistic/',
    }),
    getDealerProducts: build.query<
      DealerProductsType,
      { limit: number; page_size: number }
    >({
      query: ({ limit, page_size }) =>
        `dealer-products/?limit=${limit}&page_size=${page_size}`,
    }),
    getDealerProductId: build.query<DealerCardType, { id: number }>({
      query: ({ id }) => `dealer-products/${id}/`,
    }),
    filterDealerProducts: build.query<DealerProductsType, any>({
      query: ({ dealer_id, days, combined_status, limit, page_size = 20 }) => ({
        url: `dealer-products/`,
        params: {
          limit,
          page_size,
          dealer_id,
          days,
          combined_status,
        },
      }),
    }),
    getRelatedOwnerProduct: build.query<any, { id: number }>({
      query: ({ id }) => `owner-products/${id}/`,
    }),
    createProductRelation: build.mutation<
      ProductRelationCreateType,
      ProductRelationCreateType
    >({
      query: (relationItem) => ({
        url: `product-relation/`,
        method: 'POST',
        body: relationItem,
      }),
    }),
    deleteProductRelationId: build.mutation<
      ProductRelationItem,
      ProductRelationItem
    >({
      query: (relationItem) => ({
        /*url: `/dealer-products/${relationItem.id}/set_unprocessed/`,
        method: 'PATCH',*/
        url: `/product-relation/delete-product-relation-by-dealer-product/${relationItem.id}/`,
        method: 'DELETE',
      }),
    }),
    getOwnerProductsMatchById: build.query<
      OwnerProductsMatchType[],
      { id: number }
    >({
      query: ({ id }) => `owner-products/match_product/${id}/`,
    }),
    updateDealerProductsStatus: build.mutation<DealerCardType, { id: number }>({
      query: (currentItem) => ({
        url: `dealer-products/${currentItem.id}/set_postponed/`,
        method: 'PATCH',
      }),
    }),

    changeDealerProductStatus: build.mutation<DealerCardType, { id: number }>({
      query: (currentItem) => ({
        url: `dealer-products/${currentItem.id}/set_unprocessed/`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetDealersQuery,
  useGetDailyStatsQuery,
  useGetDealerStatsQuery,
  useGetDealerProductsQuery,
  useLazyGetDealerProductIdQuery,
  useLazyFilterDealerProductsQuery,
  useLazyGetRelatedOwnerProductQuery,
  useCreateProductRelationMutation,
  useDeleteProductRelationIdMutation,
  useLazyGetOwnerProductsMatchByIdQuery,
  useUpdateDealerProductsStatusMutation,
  useChangeDealerProductStatusMutation,
} = api;
