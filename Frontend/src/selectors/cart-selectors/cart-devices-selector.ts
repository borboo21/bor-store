import { RootState } from 'store/store';

export const cartDevicesSelector = ({ cartReducer }: RootState) => cartReducer.devices;
