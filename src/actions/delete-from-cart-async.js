import { request } from '../utils/request';
import { deleteFromCart } from './delete-from-cart';

export const deleteFromCartAsync =
	(id, userId, price, quantity, setIsLoading) => (dispatch) => {
		setIsLoading(true);
		request(`/cart/${userId}`, 'DELETE', { id }).then(() => {
			dispatch(deleteFromCart(id, price, quantity));
			setIsLoading(false);
		});
	};
