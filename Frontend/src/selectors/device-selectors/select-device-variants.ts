import type { RootState } from '../../store';

export const selectDeviceVariants = ({ deviceReducer }: RootState) =>
	deviceReducer.variants;
