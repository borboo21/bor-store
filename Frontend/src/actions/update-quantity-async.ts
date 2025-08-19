import { request } from '../utils/request';

export const updateQuantity = async (id: string, userId: string, newQuantity: number) => {
	await request(`/api/cart/${userId}`, 'PATCH', { id: id, quantity: newQuantity });
};
