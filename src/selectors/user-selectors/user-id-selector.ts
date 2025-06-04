import { RootState } from 'store/store';

export const userIdSelector = ({ userReducer }: RootState) => userReducer.id;
