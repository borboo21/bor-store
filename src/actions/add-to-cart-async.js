import { URL } from '../constants';
import { request } from '../utils/request';
import { addCart } from './add-to-cart';

export const addCartAsync = (device) => (dispatch) => {
	request(`${URL}/cart`, 'POST', device).then((rawDevice) => {
		console.log(rawDevice);
		dispatch(addCart(device));
	});
};
