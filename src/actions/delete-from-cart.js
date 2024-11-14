import { ACTION_TYPE } from './action-type';

export const deleteFromCart = (id) => ({
	type: ACTION_TYPE.DELETE_FROM_CART,
	payload: id,
});
