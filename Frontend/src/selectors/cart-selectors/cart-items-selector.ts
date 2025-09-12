import type { RootState } from '../../store';

export const cartItemsSelector = ({ cartReducer }: RootState) => cartReducer.items;
