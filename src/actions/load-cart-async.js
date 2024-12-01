import { request } from '../utils/request';
import { setCartData } from './set-cart-data';

export const loadCartAsync = (userId) => (dispatch) => {
	console.log('loadCartAsync');
	request(`/cart/${userId}`).then((cartData) => {
		if (cartData) {
			dispatch(setCartData(cartData.data));
		}
		return cartData;
	});
};
