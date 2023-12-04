import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FILTERS_KEY } from '../../utils/constants';
import { FormValues } from '../../models/models';

interface proseptState {
  filters: FormValues;
}

const initialState: proseptState = {
  filters: JSON.parse(localStorage.getItem(FILTERS_KEY) ?? '[]'),
};

export const proseptSlice = createSlice({
  name: 'prosept',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FormValues>) {
      state.filters = action.payload;
      localStorage.setItem(FILTERS_KEY, JSON.stringify(state.filters));
    },
    clearFilters(state) {
      state.filters = { dealer_id: '', day: '', matched: '', postponed: '' };
      localStorage.setItem(FILTERS_KEY, JSON.stringify(state.filters));
    },
  },
});

export const proseptActions = proseptSlice.actions;
export const proseptReducer = proseptSlice.reducer;
