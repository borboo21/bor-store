import { ROLE } from '../../constants/role';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../interfaces';

const initialState: IUser = {
	id: '',
	login: '',
	roleId: ROLE.GUEST,
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.id = action.payload.id;
			state.login = action.payload.login;
			state.roleId = action.payload.roleId;
		},
		logout: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
