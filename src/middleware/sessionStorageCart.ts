import { isAction, Middleware } from '@reduxjs/toolkit';

const sessionStorageCart: Middleware = (store) => (next) => (action) => {
	const result = next(action);
	if (
		isAction(action) &&
		(action.type === 'cartReducer/deleteFromCart' ||
			action.type === 'cartReducer/switchQuantity')
	) {
		const cart = store.getState().cartReducer;
		sessionStorage.setItem('cartData', JSON.stringify(cart.devices));
	}
	return result;
};

export default sessionStorageCart;
