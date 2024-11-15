import { ACTION_TYPE } from './action-type';

export const deleteFromCart = (id, price, quantity) => ({
	type: ACTION_TYPE.DELETE_FROM_CART,
	payload: { id, price, quantity },
});
