import { request } from '../utils/request';
import { addCart } from './add-to-cart';

export const addCartAsync = (userId, device, setIsLoading) => (dispatch) => {
	setIsLoading(true);
	request(`/cart/${userId}`, 'POST', device).then((rawDevice) => {
		dispatch(addCart(rawDevice.data, rawDevice.data.price));
		setIsLoading(false);
	});
};
