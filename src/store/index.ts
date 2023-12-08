import { configureStore } from '@reduxjs/toolkit';
import { api } from './prosept/prosept.api';
import { proseptReducer } from './prosept/prosept.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    prosept: proseptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
