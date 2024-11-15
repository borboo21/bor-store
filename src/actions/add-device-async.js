import { URL } from '../constants';
import { request } from '../utils/request';

export const addDeviceAsync = (category, name, imageUrl, price) => {
	request(`${URL}/device`, 'POST', { category, name, imageUrl, price });
};
