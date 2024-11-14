import { useState } from 'react';
import styled from 'styled-components';

const CounterItemContainer = ({ className }) => {
	const [quantity, setQuantity] = useState(1);
	const handleIncrease = () => setQuantity(quantity + 1);
	const handleDeacrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
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
