import { request } from '../utils';
import { clearCart } from 'store/slices';
import { AppDispatch } from 'store/store';

export const takeOrder = (userId: string) => (dispatch: AppDispatch) => {
	request('/order/take', 'POST', { userId }).then(() => {
		dispatch(clearCart());
	});
};
