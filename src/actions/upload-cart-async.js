import { request } from '../utils/request';

export const uploadCartAsync = async (userId, cart) => {
	await request(`/cart/merge/${userId}`, 'POST', cart);
};
