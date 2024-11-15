import { URL } from '../constants';
import { request } from '../utils/request';
import { deleteFromCart } from './delete-from-cart';

export const deleteFromCartAsync = (id, price, quantity) => (dispatch) => {
	request(`${URL}/cart/${id}`, 'DELETE').then(() => {
		dispatch(deleteFromCart(id, price, quantity));
	});
};
