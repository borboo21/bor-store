import { RootState } from '../../store/store';

export const selectDeviceCategory = ({ deviceReducer }: RootState) =>
	deviceReducer.category;
