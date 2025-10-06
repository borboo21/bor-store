import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';
import { setDeviceColor, setDeviceData, setDeviceParams } from '../slices';
import type { DeviceDTO } from '../../../../shared';
import type { RootState } from '../store';

// Загрузка данных устройства
export const loadDeviceAsync = createAsyncThunk(
	'device/loadDeviceAsync',
	(args: { deviceId: string }, { dispatch, getState }) => {
		const state = getState() as RootState;
		const variantId = state.selectionReducer.variantId;
		const specId = state.selectionReducer.specId;
		request<DeviceDTO>(`/api/device/${args.deviceId}`).then((deviceData) => {
			if (deviceData) {
				dispatch(setDeviceData(deviceData.data));
				if (variantId && specId) {
					const selectedVariant = deviceData.data.variants.find(
						(variant) => variant.variantId === variantId,
					);
					const selectedSpecs = selectedVariant?.specs.find(
						(spec) => spec.specsId === specId,
					);
					if (selectedVariant && selectedSpecs) {
						dispatch(
							setDeviceColor({
								color: selectedVariant.color,
								colorName: selectedVariant.colorName,
								variantId: selectedVariant.variantId,
								imageURL: selectedVariant.imageUrl,
							}),
						);
						dispatch(
							setDeviceParams({
								diagonal: selectedSpecs.diagonal,
								ram: selectedSpecs.ram,
								storage: selectedSpecs.storage,
								simType: selectedSpecs.simType,
								price: selectedSpecs.price,
								specsId: selectedSpecs.specsId,
							}),
						);
					}
				} else {
					dispatch(
						setDeviceColor({
							color: deviceData.data.variants[0].color,
							colorName: deviceData.data.variants[0].colorName,
							variantId: deviceData.data.variants[0].variantId,
							imageURL: deviceData.data.variants[0].imageUrl,
						}),
					);
					dispatch(
						setDeviceParams({
							diagonal: deviceData.data.variants[0].specs[0].diagonal,
							ram: deviceData.data.variants[0].specs[0].ram,
							storage: deviceData.data.variants[0].specs[0].storage,
							simType: deviceData.data.variants[0].specs[0].simType,
							price: deviceData.data.variants[0].specs[0].price,
							specsId: deviceData.data.variants[0].specs[0].specsId,
						}),
					);
				}
				return deviceData;
			}
		});
	},
);
