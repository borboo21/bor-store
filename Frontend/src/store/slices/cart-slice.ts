import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICart, ICartDevice } from '../../interfaces';

const initialState: ICart = {
	devices: [],
	amount: 0,
};

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartDevice>) => {
			const device = action.payload;
			state.devices.push(device);
			state.amount += device.price;
		},
		deleteFromCart: (
			state,
			action: PayloadAction<{ id: string; price: number; quantity: number }>,
		) => {
			const { id, price, quantity } = action.payload;
			console.log(id, price, quantity);
			state.devices = state.devices.filter((device) => device.id !== id);
			state.amount -= price * quantity;
		},
		switchQuantity: (
			state,
			action: PayloadAction<{ id: string; price: number; quantity: number }>,
		) => {
			const { id, price, quantity } = action.payload;
			const findDevice = state.devices.find((device) => device.id === id);
			if (findDevice) {
				findDevice.quantity += quantity;
			}
			state.amount = quantity > 0 ? state.amount + price : state.amount - price;
		},
		setCartData: (state, action: PayloadAction<[ICartDevice]>) => {
			const cartData = action.payload;
			if (state.devices.length === 0) {
				state.devices.push(...cartData);
			}
			state.amount = cartData.reduce(
				(sum, device) => sum + device.price * device.quantity,
				0,
			);
		},
		setCartStorage: (state, action: PayloadAction<[ICartDevice]>) => {
			const cartData = action.payload;
			state.devices.push(...cartData);
			state.amount = cartData.reduce(
				(sum, device) => sum + device.price * device.quantity,
				0,
			);
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

// export const cartReducer = (state = cartState, action) => {
// 	switch (action.type) {
// 		case ACTION_TYPE.ADD_TO_CART:
// 			return {
// 				...state,
// 				devices: [...state.devices, action.payload.device],
// 				amount: state.amount + action.payload.price,
// 			};
// 		case ACTION_TYPE.DELETE_FROM_CART:
// 			return {
// 				...state,
// 				devices: state.devices.filter(
// 					(device) => device.id !== action.payload.id,
// 				),
// 				amount: state.amount - action.payload.price * action.payload.quantity,
// 				sessionStorage: sessionStorage.cartData
// 					? sessionStorage.setItem(
// 							'cartData',
// 							JSON.stringify(
// 								state.devices.filter(
// 									(device) => device.id !== action.payload.id,
// 								),
// 							),
// 						)
// 					: null,
// 			};
// 		case ACTION_TYPE.SWITCH_QUANTITY:
// 			return {
// 				...state,
// 				devices: state.devices.map((device) =>
// 					device.id === action.payload.id
// 						? {
// 								...device,
// 								quantity: device.quantity + action.payload.quantity,
// 							}
// 						: device,
// 				),
// 				amount:
// 					action.payload.quantity > 0
// 						? state.amount + action.payload.price
// 						: state.amount - action.payload.price,
// 				sessionStorage: sessionStorage.cartData
// 					? sessionStorage.setItem(
// 							'cartData',
// 							JSON.stringify(
// 								state.devices.map((device) =>
// 									device.id === action.payload.id
// 										? {
// 												...device,
// 												quantity:
// 													device.quantity +
// 													action.payload.quantity,
// 											}
// 										: device,
// 								),
// 							),
// 						)
// 					: null,
// 			};
// 		case ACTION_TYPE.SET_CART_DATA:
// 			return {
// 				...state,
// 				devices: state.devices.length === 0 ? action.payload : state.devices,
// 				amount: action.payload.reduce(
// 					(sum, device) => sum + device.price * device.quantity,
// 					0,
// 				),
// 			};
// 		case ACTION_TYPE.SET_CART_STORAGE:
// 			return {
// 				...state,
// 				devices: action.payload,
// 				amount: action.payload.reduce(
// 					(sum, device) => sum + device.price * device.quantity,
// 					0,
// 				),
// 			};
// 		case ACTION_TYPE.CLEAR_CART:
// 			return cartState;
// 		default:
// 			return state;
// 	}
// };
