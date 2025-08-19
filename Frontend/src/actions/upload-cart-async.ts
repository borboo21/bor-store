import { request } from '../utils/request';

export const uploadCartAsync = async (userId: string, cart: {}) => {
	await request(`/api/cart/merge/${userId}`, 'POST', cart);
};
