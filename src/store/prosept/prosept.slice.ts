import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../models/models';

interface proseptState {
  filters: FormValues;
  page: number;
}

const initialState: proseptState = {
  filters: { dealer_id: '', days: '', combined_status: '' },
  page: 1,
};

export const proseptSlice = createSlice({
  name: 'prosept',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FormValues>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = { dealer_id: '', days: '', combined_status: '' };
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const proseptActions = proseptSlice.actions;
export const proseptReducer = proseptSlice.reducer;
