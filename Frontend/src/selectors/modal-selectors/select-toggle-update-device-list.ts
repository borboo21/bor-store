import type { RootState } from '../../store';

export const selectToggleUpdateDeviceList = ({ appReducer }: RootState) =>
	appReducer.updateDeviceList;
