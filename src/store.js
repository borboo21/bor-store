import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { deviceReducer } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	deviceReducer: deviceReducer,
	// userReducer: userReducer,
	// cartReducer: cartReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
