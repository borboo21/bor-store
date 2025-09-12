import type { RootState } from '../../store';

export const selectDeviceId = ({ deviceReducer }: RootState) => deviceReducer.id;
