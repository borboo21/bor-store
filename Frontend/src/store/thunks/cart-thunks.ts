import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils';
import { addToCart, deleteFromCart } from '../slices';
import type { AddToCartResponseDTO } from '@shared/types';

// Добавить товар в корзину
type thunkAddToCartType = {
	userId: string;
	deviceId: string;
	variantId: string;
	specId: string;
	setIsLoadingSpinner: (value: boolean) => void;
};

export const addCartAsync = createAsyncThunk(
	'cart/addToCartAsync',
	(args: thunkAddToCartType, { dispatch }) => {
		args.setIsLoadingSpinner(true);
		request<AddToCartResponseDTO>(`/api/cart/${args.userId}`, 'POST', {
			deviceId: args.deviceId,
			variantId: args.variantId,
			specId: args.specId,
		}).then((rawDevice) => {
			dispatch(addToCart(rawDevice.data));
			args.setIsLoadingSpinner(false);
		});
	},
);

// Убрать товар из корзины

type thunkDeleteFromCartType = {
	userId: string;
	specId: string;
	price: number;
	quantity: number;
	setIsLoadingSpinner: (value: boolean) => void;
};
export const deleteFromCartAsync = createAsyncThunk(
	'cart/deleteFromCartAsync',
	(args: thunkDeleteFromCartType, { dispatch }) => {
		args.setIsLoadingSpinner(true);
		request(`/api/cart/${args.userId}`, 'DELETE', { specId: args.specId }).then(
			() => {
				dispatch(
					deleteFromCart({
						specId: args.specId,
						price: args.price,
						quantity: args.quantity,
					}),
				);
				args.setIsLoadingSpinner(false);
			},
		);
	},
);
