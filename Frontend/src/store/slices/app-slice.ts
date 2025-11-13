import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IApp, IModal } from '../../interfaces';

const initialState: IApp = {
	wasLogout: false,
	modalCartIsOpen: false,
	modalNavigationIsOpen: false,
	updateDeviceList: false,
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
		toggleUpdateDeviceList: (state) => {
			state.updateDeviceList = !state.updateDeviceList;
		},
	},
});

export const {
	switchCartModal,
	openModal,
	closeModal,
	switchNavigationModal,
	toggleUpdateDeviceList,
} = appSlice.actions;
export default appSlice.reducer;
