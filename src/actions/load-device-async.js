import { URL } from '../constants';
import { request } from '../utils/request';
import { setDeviceData } from './set-device-data';

export const loadDeviceAsync = (deviceId) => (dispatch) =>
	request(`${URL}/device/${deviceId}`).then((deviceData) => {
		if (deviceData) {
			dispatch(setDeviceData(deviceData));
		}
		return deviceData;
	});
