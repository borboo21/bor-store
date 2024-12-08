import { ACTION_TYPE } from '../actions';

export const cartState = {
	devices: [],
	amount: 0,
};

export const cartReducer = (state = cartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				devices: [...state.devices, action.payload.device],
				amount: state.amount + action.payload.price,
			};
		case ACTION_TYPE.DELETE_FROM_CART:
			return {
				...state,
				devices: state.devices.filter(
					(device) => device.deviceId !== action.payload.id,
				),
				amount: state.amount - action.payload.price * action.payload.quantity,
				sessionStorage: sessionStorage.cartData
					? sessionStorage.setItem(
							'cartData',
							JSON.stringify(
								state.devices.filter(
									(device) => device.deviceId !== action.payload.id,
								),
							),
						)
					: null,
			};
		case ACTION_TYPE.SWITCH_QUANTITY:
			return {
				...state,
				devices: state.devices.map((device) =>
					device.deviceId === action.payload.id
						? {
								...device,
								quantity: device.quantity + action.payload.quantity,
							}
						: device,
				),
				amount:
					action.payload.quantity > 0
						? state.amount + action.payload.price
						: state.amount - action.payload.price,
				sessionStorage: sessionStorage.cartData
					? sessionStorage.setItem(
							'cartData',
							JSON.stringify(
								state.devices.map((device) =>
									device.deviceId === action.payload.id
										? {
												...device,
												quantity:
													device.quantity +
													action.payload.quantity,
											}
										: device,
								),
							),
						)
					: null,
			};
		case ACTION_TYPE.SET_CART_DATA:
			return {
				...state,
				devices: state.devices.length === 0 ? action.payload : state.devices,
				amount: action.payload.reduce(
					(sum, device) => sum + device.price * device.quantity,
					0,
				),
			};
		case ACTION_TYPE.SET_CART_STORAGE:
			return {
				...state,
				devices: action.payload,
				amount: action.payload.reduce(
					(sum, device) => sum + device.price * device.quantity,
					0,
				),
			};
		case ACTION_TYPE.CLEAR_CART:
			return cartState;
		default:
			return state;
	}
};
