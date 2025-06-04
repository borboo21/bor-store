import { request } from '../utils/request';

export const updateQuantity = async (id: string, userId: string, newQuantity: number) => {
	await request(`/cart/${userId}`, 'PATCH', { id: id, quantity: newQuantity });
};
