import { request } from '../utils/request';
import type { DeviceForm } from '../interfaces';

export const editDeviceAsync = (deviceId: string, Device: DeviceForm) => {
	request<DeviceForm>(`/api/device/${deviceId}`, 'PATCH', Device).then(() => {});
};
