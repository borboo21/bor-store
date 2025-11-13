import { request } from '../utils/request';
import type { DeviceForm } from '../interfaces';

export const addDeviceAsync = (Device: DeviceForm) => {
	request<DeviceForm>(`/api/device`, 'POST', Device).then(() => {});
};
