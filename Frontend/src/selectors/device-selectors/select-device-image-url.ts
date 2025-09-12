import type { RootState } from '../../store';

export const selectDeviceImageURL = ({ deviceReducer }: RootState) =>
	deviceReducer.imageUrl;
