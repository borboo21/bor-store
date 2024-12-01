import { request } from '../utils/request';
import { setDeviceData } from './set-device-data';

export const loadDeviceAsync = (deviceId) => (dispatch) =>
	request(`/device/${deviceId}`).then((deviceData) => {
		if (deviceData) {
			dispatch(setDeviceData(deviceData.data));
		}
		return deviceData;
	});
