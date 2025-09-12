import type { RootState } from '../../store';

export const userLoginSelector = ({ userReducer }: RootState) => userReducer.login;
