import { RootState } from 'store/store';

export const selectWasLogout = ({ appReducer }: RootState) => appReducer.wasLogout;
