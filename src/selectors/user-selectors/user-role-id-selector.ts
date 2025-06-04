import { RootState } from 'store/store';

export const selectUserRoleIdSelector = ({ userReducer }: RootState) =>
	userReducer.roleId;
