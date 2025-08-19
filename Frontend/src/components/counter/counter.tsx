import { useDispatch, useSelector } from 'react-redux';
import {
	cartDevicesSelector,
	selectUserRoleIdSelector,
	userIdSelector,
} from '../../selectors';
import { updateQuantity } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { switchQuantity, type AppDispatch } from '../../store';
import type { ICounter } from '../../interfaces';
import styled from 'styled-components';

const CounterItemContainer: React.FC<ICounter> = ({ className, id, price }) => {
	const dispatch: AppDispatch = useDispatch();
	const userRole = useSelector(selectUserRoleIdSelector);
	const userId = useSelector(userIdSelector);
	const cartDevices = useSelector(cartDevicesSelector);
	const itemInCart = cartDevices.find((device) => device.id === id);
	if (!itemInCart) {
		return;
	}
	const quantity = itemInCart.quantity;

	const handleIncrease = () => {
		dispatch(switchQuantity({ quantity: 1, id, price }));
		if (userRole !== 3) {
			updateQuantity(id, userId, quantity + 1);
		}
	};

	const handleDeacrease = () => {
		if (quantity > 1) {
			dispatch(switchQuantity({ quantity: -1, id, price }));
			if (userRole !== 3) {
				updateQuantity(id, userId, quantity - 1);
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
