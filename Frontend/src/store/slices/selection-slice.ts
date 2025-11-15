import type { DeviceSpecsDTO } from '@shared/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectionSlice {
	variantId: string;
	specId: string;
	params: {
		color: string;
		colorName: string;
		imageUrl: string;
		storage: string | null | undefined;
		diagonal: string | null | undefined;
		ram: string | null | undefined;
		simType: string | null | undefined;
	};
}

const initialState: SelectionSlice = {
	variantId: '',
	specId: '',
	params: {
		color: '',
		colorName: '',
		imageUrl: '',
		storage: '',
		diagonal: '',
		ram: '',
		simType: '',
	},
};

function getSpecIdFromParams(
	specs: DeviceSpecsDTO[],
	params: SelectionSlice['params'],
): string | null {
	return (
		specs.find(
			(spec) =>
				(!params.storage || spec.storage === params.storage) &&
				(!params.diagonal || spec.diagonal === params.diagonal) &&
				(!params.ram || spec.ram === params.ram) &&
				(!params.simType || spec.simType === params.simType),
		)?.specsId || null
	);
}

const selectionSlice = createSlice({
	name: 'selectionSlice',
	initialState,
	reducers: {
		setDeviceColor: (
			state,
			action: PayloadAction<{
				color: string;
				colorName: string;
				variantId: string;
				imageURL: string;
			}>,
		) => {
			state.variantId = action.payload.variantId;
			state.params.color = action.payload.color;
			state.params.colorName = action.payload.colorName;
			state.params.imageUrl = action.payload.imageURL;
		},
		setDeviceParams: (state, action: PayloadAction<DeviceSpecsDTO>) => {
			state.specId = action.payload.specsId;
			state.params.diagonal = action.payload.diagonal;
			state.params.ram = action.payload.ram;
			state.params.simType = action.payload.simType;
			state.params.storage = action.payload.storage;
		},
		setDeviceStorage: (state, action: PayloadAction<string>) => {
			state.params.storage = action.payload;
		},
		setDeviceDiagonal: (state, action: PayloadAction<string>) => {
			state.params.diagonal = action.payload;
		},
		setDeviceRam: (state, action: PayloadAction<string>) => {
			state.params.ram = action.payload;
		},
		setDeviceSimType: (state, action: PayloadAction<string>) => {
			state.params.simType = action.payload;
		},
		findSpecId: (state, action: PayloadAction<DeviceSpecsDTO[]>) => {
			const specId = getSpecIdFromParams(action.payload, state.params);
			state.specId = specId || '';
		},
		resetSelectionData: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const {
	setDeviceColor,
	setDeviceParams,
	setDeviceStorage,
	setDeviceDiagonal,
	setDeviceRam,
	setDeviceSimType,
	findSpecId,
	resetSelectionData,
} = selectionSlice.actions;

export default selectionSlice.reducer;
