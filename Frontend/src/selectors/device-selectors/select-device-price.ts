import { RootState } from '../../store/store';

export const selectDevicePrice = ({ deviceReducer }: RootState) => deviceReducer.price;
