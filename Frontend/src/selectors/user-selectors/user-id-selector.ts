import type { RootState } from '../../store';

export const userIdSelector = ({ userReducer }: RootState) => userReducer.id;
