import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DealerCardType } from '../../models/models';

interface dealerProductsState {
  dealerProducts: DealerCardType[];
}

const initialState: dealerProductsState = {
  dealerProducts: [],
};

export const dealerProducts = createSlice({
  name: 'dealerProducts',
  initialState,
  reducers: {
    setDealerProducts(state, action: PayloadAction<DealerCardType[]>) {
      state.dealerProducts = action.payload;
    },
  },
});

export const dealerProductsActions = dealerProducts.actions;
export const dealerProductsReducer = dealerProducts.reducer;
