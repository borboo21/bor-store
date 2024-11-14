import { URL } from '../constants';
import { request } from '../utils/request';
import { deleteFromCart } from './delete-from-cart';

export const deleteFromCartAsync = (id) => (dispatch) => {
	console.log(id);
	request(`${URL}/cart/${id}`, 'DELETE').then(() => {
		dispatch(deleteFromCart(id));
	});
};
