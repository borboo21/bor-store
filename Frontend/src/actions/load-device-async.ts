import type { DeviceDTO } from '../../../shared/types/interface';
import { setDeviceData, type AppDispatch } from '../store';
import { request } from '../utils/request';

export const loadDeviceAsync = (id: string) => (dispatch: AppDispatch) =>
	request<DeviceDTO>(`/api/device/${id}`).then((deviceData) => {
		if (deviceData) {
			dispatch(setDeviceData(deviceData.data));
		}
		return deviceData;
	});
