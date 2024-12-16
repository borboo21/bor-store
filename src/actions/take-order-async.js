import { request } from '../utils';
import { clearCart } from './clear-cart';

export const takeOrder = (userId) => (dispatch) => {
	request('/order/take', 'POST', { userId }).then(() => {
		dispatch(clearCart());
	});
};
