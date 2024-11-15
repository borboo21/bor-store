import { ACTION_TYPE } from './action-type';

export const addCart = (device, price) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: { device, price },
});
