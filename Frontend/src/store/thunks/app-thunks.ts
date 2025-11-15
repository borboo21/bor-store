import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';
import { setCartData } from '../slices';
import type { CartDTO } from '@shared/types';

// Загрузка данных корзины
export const loadCartAsync = createAsyncThunk(
	'cart/loadCartAsync',
	(userId: string, { dispatch }) =>
		request<CartDTO>(`/api/cart/${userId}`).then((cartData) => {
			if (cartData.data.items.length !== 0) {
				dispatch(setCartData(cartData.data));
			}
		}),
);
