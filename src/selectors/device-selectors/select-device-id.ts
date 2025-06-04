import { RootState } from '../../store/store';

export const selectDeviceId = ({ deviceReducer }: RootState) => deviceReducer.id;
