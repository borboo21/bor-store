import type { RootState } from '../../store';

export const selectDevicePrice = ({ deviceReducer }: RootState) => deviceReducer.price;
