import type { RootState } from '../../store';

export const cartDevicesSelector = ({ cartReducer }: RootState) => cartReducer.devices;
