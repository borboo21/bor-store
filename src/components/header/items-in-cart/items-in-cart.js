import styled from 'styled-components';

const ItemsInCartContainer = ({ className, quantity = 0 }) =>
	quantity > 9 ? (
		<div className={className}>9+</div>
	) : <div className={className}>{quantity}</div> && quantity > 0 ? (
		<div className={className}>{quantity}</div>
	) : null;

export const ItemsInCart = styled(ItemsInCartContainer)`
	position: absolute;
	width: 20px;
	height: 20px;
	background-color: #9dd558;
	border-radius: 15px;
	font-size: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	z-index: 2;
	left: 34px;
	top: -10px;
`;
