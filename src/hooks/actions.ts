import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { proseptActions } from '../store/prosept/prosept.slice';
import { dealerProductsActions } from '../store/prosept/dealerProducts.slice';

const actions = {
  ...proseptActions,
  ...dealerProductsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
