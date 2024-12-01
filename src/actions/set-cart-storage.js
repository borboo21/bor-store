import { ACTION_TYPE } from './action-type';

export const setCartStorage = (cart) => ({
	type: ACTION_TYPE.SET_CART_STORAGE,
	payload: cart,
});
