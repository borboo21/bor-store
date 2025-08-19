import { IModal } from '../../interfaces/interface';
import { IApp } from 'interfaces/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IApp = {
	wasLogout: false,
	modalCartIsOpen: false,
	modalNavigationIsOpen: false,
	modal: {
		isOpen: false,
		text: '',
		type: 'unknown',
		info: null,
	},
};

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		logout: (state) => {
			state.wasLogout = !state.wasLogout;
		},
		switchCartModal: (state) => {
			state.modalCartIsOpen = !state.modalCartIsOpen;
		},
		switchNavigationModal: (state) => {
			state.modalNavigationIsOpen = !state.modalNavigationIsOpen;
		},
		openModal: (state, action: PayloadAction<IModal>) => {
			state.modal = action.payload;
		},
		closeModal: (state) => {
			Object.assign(state.modal, initialState.modal);
		},
	},
});

export const { switchCartModal, openModal, closeModal, switchNavigationModal } =
	appSlice.actions;
export default appSlice.reducer;
