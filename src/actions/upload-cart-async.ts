import { request } from '../utils/request';

export const uploadCartAsync = async (userId: string, cart: {}) => {
	await request(`/cart/merge/${userId}`, 'POST', cart);
};
