import { request } from '../utils';

export const takeOrder = (userId) => {
	request('/order/take', 'POST', { userId });
};
