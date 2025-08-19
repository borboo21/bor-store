import { request } from 'utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart } from 'store/slices';
import { ICartDevice } from 'interfaces/interface';

type thunkCartType = {
	userId: string;
	cartDevice: ICartDevice;
	setIsLoadingSpinner: (value: boolean) => void;
};

// Добавить товар в корзину
export const addCartAsync = createAsyncThunk(
	'cart/addToCartAsync',
	(args: thunkCartType, { dispatch }) => {
		args.setIsLoadingSpinner(true);
		request(`/cart/${args.userId}`, 'POST', args.cartDevice).then((rawDevice) => {
			dispatch(addToCart(rawDevice.data));
			args.setIsLoadingSpinner(false);
		});
	},
);

// Убрать товар из корзины
export const deleteFromCartAsync = createAsyncThunk(
	'cart/deleteFromCartAsync',
	(
		args: {
			userId: string;
			id: string;
			price: number;
			quantity: number;
			setIsLoadingSpinner: (value: boolean) => void;
		},
		{ dispatch },
	) => {
		args.setIsLoadingSpinner(true);
		request(`/cart/${args.userId}`, 'DELETE', { id: args.id }).then(() => {
			dispatch(
				deleteFromCart({
					id: args.id,
					price: args.price,
					quantity: args.quantity,
				}),
			);
			args.setIsLoadingSpinner(false);
		});
	},
);
