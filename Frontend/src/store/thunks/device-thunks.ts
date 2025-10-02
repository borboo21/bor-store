import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';
import { setDeviceData } from '../slices';
import type { DeviceDTO } from '../../../../shared';

export const loadDeviceAsync = createAsyncThunk(
	'device/loadDeviceAsync',
	(args: { deviceId: string }, { dispatch }) => {
		console.log(args.deviceId);
		request<DeviceDTO>(`/api/device/${args.deviceId}`).then((deviceData) => {
			if (deviceData) {
				dispatch(setDeviceData(deviceData.data));
			}
			return deviceData;
		});
	},
);
