import { ACTION_TYPE } from './action-type';

export const switchQuantity = (quantity, id, price) => ({
	type: ACTION_TYPE.SWITCH_QUANTITY,
	payload: { quantity, id, price },
});
