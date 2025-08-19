import { clearCart, type AppDispatch } from '../store';
import { request } from '../utils';

export const takeOrder = (userId: string) => (dispatch: AppDispatch) => {
	request('/api/order/take', 'POST', { userId }).then(() => {
		dispatch(clearCart());
	});
};
