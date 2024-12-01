import { ACTION_TYPE } from '../actions';

export const deviceState = {
	id: '',
	category: '',
	name: '',
	imageUrl: '',
	price: 0,
};

export const deviceReducer = (state = deviceState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_DEVICE_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_DEVICE_DATA:
			return deviceState;
		default:
			return state;
	}
};
