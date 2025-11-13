import type { DeviceDTO } from './../../../../shared/types/interface';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: DeviceDTO = {
	id: '',
	category: '',
	name: '',
	basePrice: 0,
	variants: [],
};

const deviceSlice = createSlice({
	name: 'deviceSlice',
	initialState,
	reducers: {
		setDeviceData: (state, action: PayloadAction<DeviceDTO>) => {
			state.id = action.payload.id;
			state.category = action.payload.category;
			state.name = action.payload.name;
			state.variants = action.payload.variants;
		},
		resetDeviceData: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const { setDeviceData, resetDeviceData } = deviceSlice.actions;
export default deviceSlice.reducer;
