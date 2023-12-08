import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DealerProductsType } from '../../models/models';

interface dealerProductsState {
  dealerProducts: DealerProductsType;
}

const initialState: dealerProductsState = {
  dealerProducts: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
};

export const dealerProducts = createSlice({
  name: 'dealerProducts',
  initialState,
  reducers: {
    setDealerProducts(state, action: PayloadAction<DealerProductsType>) {
      state.dealerProducts = action.payload;
    },
  },
});

export const dealerProductsActions = dealerProducts.actions;
export const dealerProductsReducer = dealerProducts.reducer;
