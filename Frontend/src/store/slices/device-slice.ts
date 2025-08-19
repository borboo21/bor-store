import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IDevice } from '../../interfaces';

const initialState: IDevice = {
	id: '',
	category: '',
	name: '',
	imageUrl: '',
	price: 0,
};

const deviceSlice = createSlice({
	name: 'deviceSlice',
	initialState,
	reducers: {
		setDeviceData: (state, action: PayloadAction<IDevice>) => {
			state.id = action.payload.id;
			state.category = action.payload.category;
			state.name = action.payload.name;
			state.imageUrl = action.payload.imageUrl;
			state.price = action.payload.price;
		},
		resetDeviceData: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const { setDeviceData, resetDeviceData } = deviceSlice.actions;
export default deviceSlice.reducer;
