import type { RootState } from '../../store';

export const selectDeviceCategory = ({ deviceReducer }: RootState) =>
	deviceReducer.category;
