import type { RootState } from '../../store';

export const selectUserRoleIdSelector = ({ userReducer }: RootState) =>
	userReducer.roleId;
