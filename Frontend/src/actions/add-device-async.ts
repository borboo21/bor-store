// import type { SetStateAction } from 'react';
import { request } from '../utils/request';
import type { DeviceForm } from '../interfaces';

export const addDeviceAsync = (
	Device: DeviceForm,
	// setIsLoading: React.Dispatch<SetStateAction<boolean>>,
) => {
	console.log(Device);
	// setIsLoading(true);
	request<DeviceForm>(`/api/device`, 'POST', Device).then(() => {
		// setIsLoading(false);
	});
};
