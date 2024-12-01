import { request } from '../utils/request';
import { deleteFromCart } from './delete-from-cart';

export const deleteFromCartAsync = (id, userId, price, quantity) => (dispatch) => {
	request(`/cart/${userId}`, 'DELETE', { id }).then(() => {
		dispatch(deleteFromCart(id, price, quantity));
	});
};
