import { SetStateAction } from 'react';
import { request } from '../utils/request';

export const addDeviceAsync = (
	category: string,
	name: string,
	imageUrl: string,
	price: number,
	setIsLoading: React.Dispatch<SetStateAction<boolean>>,
) => {
	setIsLoading(true);
	request(`/device`, 'POST', { category, name, imageUrl, price }).then(() => {
		setIsLoading(false);
	});
};
