import { URL } from '../constants';
import { request } from '../utils/request';

export const updateQuantity = async (id, newQuantity) => {
	await request(`${URL}/cart/${id}`, 'PATCH', { quantity: newQuantity });
};
