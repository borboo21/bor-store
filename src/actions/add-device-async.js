import { request } from '../utils/request';

export const addDeviceAsync = (category, name, imageUrl, price) => {
	request(`/device`, 'POST', { category, name, imageUrl, price });
};
