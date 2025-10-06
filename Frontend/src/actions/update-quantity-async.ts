import { request } from '../utils/request';

export const updateQuantity = async (
	specId: string,
	userId: string,
	newQuantity: number,
) => {
	await request(`/api/cart/${userId}`, 'PATCH', { specId, quantity: newQuantity });
};
