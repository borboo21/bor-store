import { ACTION_TYPE } from './action-type';

export const setDeviceData = (deviceData) => ({
	type: ACTION_TYPE.SET_DEVICE_DATA,
	payload: deviceData,
});
