import { request } from '../utils/request';
import { setDeviceData } from 'store/slices';
import { AppDispatch } from 'store/store';

export const loadDeviceAsync = (id: string) => (dispatch: AppDispatch) =>
	request(`/device/${id}`).then((deviceData) => {
		if (deviceData) {
			dispatch(setDeviceData(deviceData.data));
		}
		return deviceData;
	});
