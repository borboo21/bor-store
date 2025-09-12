import { isAction, type Middleware } from '@reduxjs/toolkit';

const sessionStorageCart: Middleware = (store) => (next) => (action) => {
	const result = next(action);
	const user = store.getState().userReducer;
	if (user.role === 3) {
		if (
			isAction(action) &&
			(action.type === 'cartSlice/deleteFromCart' ||
				action.type === 'cartSlice/switchQuantity')
		) {
			const cart = store.getState().cartReducer;

			sessionStorage.setItem('cartData', JSON.stringify(cart.items));
		}
		return result;
	}
};

export default sessionStorageCart;
