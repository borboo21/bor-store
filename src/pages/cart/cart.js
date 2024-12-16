import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardButton, CartItem } from '../../components';
import { cartSelector, userSelector, appSelector } from '../../selectors';
import { loadCartAsync, switchCartModal, takeOrder } from '../../actions';
import { CartSendOrder, CartTotalBlock, EmptyCart } from './components';
import { useClickAway } from '@uidotdev/usehooks';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOrdered, setIsOrdered] = useState(false);

	const dispatch = useDispatch();
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);
	const app = useSelector(appSelector);
	const userId = user.id;
	const userRole = user.roleId;

	const onClose = () => {
		dispatch(switchCartModal());
		setIsOrdered(false);
	};

	const onTakeOrder = () => {
		dispatch(takeOrder(userId));
		setIsOrdered(true);
		loadCartAsync();
	};

	const ref = useClickAway(onClose);

	useEffect(() => {
		if (app.modalCartIsOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [app.modalCartIsOpen]);

	if (!app.modalCartIsOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="drawer" ref={ref}>
				{cart.devices.length !== 0 && (
					<div className="cart-header">
						<h2 className="cart-name">Корзина</h2>
						<CardButton onClick={onClose} faIcon={faX} />
					</div>
				)}
				{isOrdered ? (
					<CartSendOrder />
				) : cart.devices.length === 0 ? (
					<EmptyCart onClose={onClose} />
				) : (
					<>
						<div className="cart-items">
							{cart.devices.map((item) => (
								<CartItem
									dispatch={dispatch}
									key={item.deviceId}
									id={item.deviceId}
									name={item.name}
									price={item.price}
									img={item.imageUrl}
									quantity={item.quantity}
									userId={userId}
									userRole={userRole}
									isLoading={isLoading}
									setIsLoading={setIsLoading}
								/>
							))}
						</div>
						<CartTotalBlock
							cart={cart}
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

	.drawer {
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 420px;
		right: 0;
		height: 100%;
		background: #ffffff;
		box-shadow: -10px 4px 24px rgba(0, 0, 0, 0.1);
		padding: 30px;
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
`;
