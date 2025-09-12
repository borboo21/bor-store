import type { MergeCartDataDTO } from '../../../shared';
import { request } from '../utils/request';

export const uploadCartAsync = async (userId: string, cart: MergeCartDataDTO) => {
	await request(`/api/cart/merge/${userId}`, 'POST', cart);
};
