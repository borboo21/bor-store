import { RootState } from '../../store/store';

export const selectDeviceName = ({ deviceReducer }: RootState) => deviceReducer.name;
