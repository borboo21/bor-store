import type { RootState } from '../../store';

export const cartAmountSelector = ({ cartReducer }: RootState) => cartReducer.amount;
