import type {
	AddToCartResponseDTO,
	CartDTO,
	DeviceDTO,
} from '../../../../shared/types/interface';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartDTO = {
	items: [],
	amount: 0,
};

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<AddToCartResponseDTO>) => {
			const cartData = action.payload;
			state.items.push({ device: cartData.device, quantity: cartData.quantity });
			if (cartData.amount) {
				state.amount = cartData.amount;
			} else {
				state.amount += cartData.device.price;
			}
		},
		deleteFromCart: (
			state,
			action: PayloadAction<{ deviceId: string; price: number; quantity: number }>,
		) => {
			const { deviceId, price, quantity } = action.payload;
			state.items = state.items.filter((item) => item.device.id !== deviceId);
			state.amount -= price * quantity;
		},

		switchQuantity: (
			state,
			action: PayloadAction<{ id: string; price: number; quantity: number }>,
		) => {
			const { id, price, quantity } = action.payload;
			const findDevice = state.items.find((item) => item.device.id === id);
			if (findDevice) {
				findDevice.quantity += quantity;
			}
			state.amount = quantity > 0 ? state.amount + price : state.amount - price;
		},
		setCartData: (state, action: PayloadAction<CartDTO>) => {
			const cartData = action.payload;
			state.items = cartData.items;
			state.amount = cartData.amount;
		},
		setCartStorage: (
			state,
			action: PayloadAction<[{ device: DeviceDTO; quantity: number }]>,
		) => {
			const cartData = action.payload;
			state.items = cartData;
			if (state.items.length > 0) {
				state.amount = state.items.reduce(
					(sum, item) => sum + item.device.price * item.quantity,
					0,
				);
			}
		},
		clearCart: (state) => {
			Object.assign(state, initialState);
		},
	},
});

export const {
	addToCart,
	deleteFromCart,
	switchQuantity,
	setCartData,
	setCartStorage,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
