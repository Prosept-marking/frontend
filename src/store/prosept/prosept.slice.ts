import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../models/models';

interface proseptState {
  filters: FormValues;
}

const initialState: proseptState = {
  filters: { dealer_id: '', days: '', matched: '', postponed: '' },
};

export const proseptSlice = createSlice({
  name: 'prosept',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FormValues>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = { dealer_id: '', days: '', matched: '', postponed: '' };
    },
  },
});

export const proseptActions = proseptSlice.actions;
export const proseptReducer = proseptSlice.reducer;
