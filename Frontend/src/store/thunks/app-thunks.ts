import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCartData } from 'store/slices';
import { request } from 'utils';

export const loadCartAsync = createAsyncThunk(
	'cart/loadCartAsync',
	(userId: string, { dispatch }) =>
		request(`/cart/${userId}`).then((cartData) => {
			if (cartData.data.length !== 0) {
				dispatch(setCartData(cartData.data));
			}
		}),
);
