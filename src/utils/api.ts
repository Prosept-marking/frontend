import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://213.171.4.71:8000/api/v1/' }),
  endpoints: (build) => ({
    getDilers: build.query<any, void>({
      query: () => 'dealer-names/',
    }),
  }),
});

export const { useGetDilersQuery } = api;
