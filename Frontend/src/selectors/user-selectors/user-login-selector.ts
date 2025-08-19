import { RootState } from 'store/store';

export const userLoginSelector = ({ userReducer }: RootState) => userReducer.login;
