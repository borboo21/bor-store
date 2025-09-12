import type { RootState } from '../../store';

export const selectWasLogout = ({ appReducer }: RootState) => appReducer.wasLogout;
