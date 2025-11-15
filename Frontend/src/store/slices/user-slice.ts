import { ROLE } from '../../constants/role';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserDTO } from '@shared/types';

const initialState: UserDTO = {
	id: '',
	login: '',
	role: ROLE.GUEST,
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserDTO>) => {
			state.id = action.payload.id;
			state.login = action.payload.login;
			state.role = action.payload.role;
		},
		logout: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
