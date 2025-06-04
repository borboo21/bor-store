import { RootState } from 'store/store';

export const cartAmountSelector = ({ cartReducer }: RootState) => cartReducer.amount;
