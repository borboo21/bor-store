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
				devices: [...state.devices, action.payload],
			};
		case ACTION_TYPE.DELETE_FROM_CART:
			return {
				...state,
				devices: state.devices.filter((device) => device.id !== action.payload),
			};
		case ACTION_TYPE.AMOUNT_DEVICES:
			return {
				...state,
				amount: state.devices.reduce((sum, device) => sum + device.price, 0),
			};
		case ACTION_TYPE.SET_CART_DATA:
			return {
				...state,
				devices: action.payload,
			};
		default:
			return state;
	}
};
