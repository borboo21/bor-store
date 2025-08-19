import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';
import cartReducer from './slices/cart-slice';
import deviceReducer from './slices/device-slice';
import appReducer from './slices/app-slice';
import sessionStorageCart from '../middleware/sessionStorageCart';

const reducer = combineReducers({
	deviceReducer: deviceReducer,
	userReducer: userReducer,
	cartReducer: cartReducer,
	appReducer: appReducer,
});

export const store = configureStore({
	reducer: reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sessionStorageCart),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
