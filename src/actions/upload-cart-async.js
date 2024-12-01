import { request } from '../utils/request';

export const uploadCartAsync = async (userId, cart) => {
	console.log(cart);
	await request(`/cart/merge/${userId}`, 'POST', cart);
};
