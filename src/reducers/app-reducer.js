import { ACTION_TYPE } from '../actions';

export const initialAppState = {
	wasLogout: false,
	modalIsOpen: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.SWITCH_MODAL:
			return {
				...state,
				modalIsOpen: !state.modalIsOpen,
			};
		default:
			return state;
	}
};
