import { request } from '../utils/request';
import { setDeviceData } from './set-device-data';

export const loadDeviceAsync = (deviceId) => (dispatch) =>
	request(`https://6720f7f998bbb4d93ca6e474.mockapi.io/iphone/${deviceId}`).then(
		(deviceData) => {
			console.log(deviceData);
			if (deviceData) {
				dispatch(setDeviceData(deviceData));
			}
			return deviceData;
		},
	);
