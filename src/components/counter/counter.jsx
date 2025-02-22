import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, userSelector } from '../../selectors';
import { switchQuantity, updateQuantity } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CounterItemContainer = ({ className, id, price }) => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const cart = useSelector(cartSelector);
	const itemInCart = cart.devices.find((device) => device.deviceId === id);
	const quantity = itemInCart.quantity;

	const handleIncrease = () => {
		dispatch(switchQuantity(1, id, price));
		if (user.roleId !== 3) {
			updateQuantity(id, user.id, quantity + 1);
		}
	};

	const handleDeacrease = () => {
		if (quantity > 1) {
			dispatch(switchQuantity(-1, id, price));
			if (user.roleId !== 3) {
				updateQuantity(id, user.id, quantity - 1);
			}
		}
	};

	return (
		<div className={className}>
			<button className="counter-button" onClick={handleDeacrease}>
				<FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
			</button>
			<input className="counter-input" value={quantity} readOnly></input>
			<button className="counter-button" onClick={handleIncrease}>
				<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
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
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
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
