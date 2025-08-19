import type { RootState } from '../../store';

export const selectDeviceName = ({ deviceReducer }: RootState) => deviceReducer.name;
