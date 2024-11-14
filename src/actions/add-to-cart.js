import { ACTION_TYPE } from './action-type';

export const addCart = (device) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: device,
});
