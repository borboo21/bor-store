import styled from 'styled-components';

const CounterItemContainer = ({ className, count }) => {
	return (
		<div className={className}>
			<button className="counter-button">-</button>
			<input className="counter-input" value={count}></input>
			<button className="counter-button">+</button>
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
