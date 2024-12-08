import { request } from '../utils/request';

export const addDeviceAsync = (category, name, imageUrl, price, setIsLoading) => {
	setIsLoading(true);
	request(`/device`, 'POST', { category, name, imageUrl, price }).then(() => {
		setIsLoading(false);
	});
};
