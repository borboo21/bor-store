import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardButton, CartItem } from '../../components';
import { modalCartIsOpen, cartItemsSelector, userIdSelector } from '../../selectors';
import { takeOrder } from '../../actions';
import { CartSendOrder, CartTotalBlock, EmptyCart } from './components';
import { faX } from '@fortawesome/free-solid-svg-icons';
import type { IComponentProps } from '../../interfaces';
import { loadCartAsync, switchCartModal, type AppDispatch } from '../../store';
import styled from 'styled-components';

const CartContainer: React.FC<IComponentProps> = ({ className }) => {
	const [isOrdered, setIsOrdered] = useState(false);
	const [visible, setVisible] = useState(false);

	const dispatch: AppDispatch = useDispatch();
	const cartDevices = useSelector(cartItemsSelector);
	const modalCart = useSelector(modalCartIsOpen);
	const userId = useSelector(userIdSelector);

	useEffect(() => {
		if (modalCart) {
			document.body.classList.add('modal-open');
			setVisible(true);
		} else {
			document.body.classList.remove('modal-open');
			const timer = setTimeout(() => setVisible(false), 300);
			return () => clearTimeout(timer);
		}
	}, [modalCart]);

	const onClose = () => {
		dispatch(switchCartModal());
		setIsOrdered(false);
	};

	const onTakeOrder = () => {
		dispatch(takeOrder(userId));
		setIsOrdered(true);
		loadCartAsync(userId);
	};

	if (!visible) {
		return null;
	}

	return (
		<div className={className} onClick={onClose}>
			<div
				className={`drawer ${modalCart ? 'open' : 'close'}`}
				onClick={(e) => e.stopPropagation()}
			>
				{cartDevices.length !== 0 && (
					<div className="cart-header">
						<h2 className="cart-name">Корзина</h2>
						<CardButton onClick={onClose} icon={faX} />
					</div>
				)}
				{isOrdered ? (
					<CartSendOrder onClose={onClose} />
				) : cartDevices.length === 0 ? (
					<EmptyCart onClose={onClose} />
				) : (
					<>
						<div className="cart-items">
							{cartDevices.map((item) => (
								<CartItem
									key={item.device.specId}
									deviceId={item.device.deviceId}
									variantId={item.device.variantId}
									specId={item.device.specId}
									category={item.device.category}
									name={item.device.name}
									price={item.device.price}
									imageUrl={item.device.imageUrl}
									color={item.device.color}
									colorName={item.device.colorName}
									diagonal={item.device.diagonal}
									storage={item.device.storage}
									simType={item.device.simType}
									ram={item.device.ram}
									quantity={item.quantity}
								/>
							))}
						</div>
						<CartTotalBlock
							userId={userId}
							onClose={onClose}
							onTakeOrder={onTakeOrder}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
	overflow: hidden;
	opacity: 0;
	animation: fadeIn 0.3s forwards;

	.drawer {
		display: flex;
		flex-direction: column;
		position: fixed;
		right: 0;
		min-width: 500px;
		height: 100%;
		background: #ffffff;
		box-shadow: -10px 4px 24px rgba(0, 0, 0, 0.1);
		padding: 30px;
		transform: translateX(100%);
	}

	.drawer.open {
		animation: slideInCart 0.3s forwards;
	}

	.drawer.close {
		animation: slideOutCart 0.3s forwards;
	}

	.cart-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cart-name {
		display: flex;
		justify-content: space-between;
		margin: 0 0 30px 0;
	}

	.cart-items {
		flex: 1;
		overflow: auto;
		margin-bottom: 40px;
		padding-right: 10px;
	}

	@media (max-width: 420px) {
		.drawer {
			width: auto;
		}
	}

	@keyframes slideInCart {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideOutCart {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(100%);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
