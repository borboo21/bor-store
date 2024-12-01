import { request } from '../utils/request';

export const updateQuantity = async (id, userId, newQuantity) => {
	await request(`/cart/${userId}`, 'PATCH', { deviceId: id, quantity: newQuantity });
};
