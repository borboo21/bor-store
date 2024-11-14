import { URL } from '../constants';
import { request } from '../utils/request';
import { setCartData } from './set-cart-data';

export const loadCartAsync = () => (dispatch) =>
	request(`${URL}/cart`).then((cartData) => {
		console.log(cartData);
		if (cartData) {
			dispatch(setCartData(cartData));
		}
		return cartData;
	});
