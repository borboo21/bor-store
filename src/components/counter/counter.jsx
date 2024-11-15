import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../selectors';
import { switchQuantity, updateQuantity } from '../../actions';
import styled from 'styled-components';

const CounterItemContainer = ({ className, id, price }) => {
	const dispatch = useDispatch();
	const cart = useSelector(cartSelector);
	const itemInCart = cart.devices.find((device) => device.id === id);
	const quantity = itemInCart.quantity;

	const handleIncrease = () => {
		dispatch(switchQuantity(1, id, price));
		updateQuantity(id, quantity + 1);
	};

	const handleDeacrease = () => {
		if (quantity > 1) {
			dispatch(switchQuantity(-1, id, price));
			updateQuantity(id, quantity + 1);
		}
	};

	return (
		<div className={className}>
			<button className="counter-button" onClick={handleDeacrease}>
				-
			</button>
			<input className="counter-input" value={quantity} readOnly></input>
			<button className="counter-button" onClick={handleIncrease}>
				+
			</button>
		</div>
	);
};

export const CounterItem = styled(CounterItemContainer)`
	display: flex;

	.counter-input {
		font-size: 16px;
		font-weight: 16px;
		text-align: center;
		width: 24px;
		height: 24px;
		padding: 0;
		border: none;
		outline: none;
	}

	.counter-button {
		font-size: 16px;
		color: #808080;
		text-align: center;
		text-decoration: none;
		width: 24px;
		height: 24px;
		background-color: #ffffff;
		border: 1px solid #f2f2f2;
		border-radius: 18px;
		cursor: pointer;

		color: gray;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;

		&:hover {
			opacity: 0.5;
		}

		&:active {
			background-color: #808080;
		}
	}
`;
