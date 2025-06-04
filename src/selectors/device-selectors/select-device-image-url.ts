import { RootState } from '../../store/store';

export const selectDeviceImageURL = ({ deviceReducer }: RootState) =>
	deviceReducer.imageUrl;
