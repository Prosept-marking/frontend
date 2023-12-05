import { configureStore } from '@reduxjs/toolkit';
import { api } from './prosept/prosept.api';
import { proseptReducer } from './prosept/prosept.slice';
import { dealerProductsReducer } from './prosept/dealerProducts.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    prosept: proseptReducer,
    dealerProducts: dealerProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
