import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardButton, CartItem } from '../../components';
import { modalCartIsOpen, cartDevicesSelector, userIdSelector } from '../../selectors';
import { takeOrder } from '../../actions';
import { switchCartModal } from 'store/slices';
import { CartSendOrder, CartTotalBlock, EmptyCart } from './components';
import { useClickAway } from '@uidotdev/usehooks';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { IComponentProps } from 'interfaces/interface';
import { AppDispatch } from 'store/store';
import styled from 'styled-components';
import { loadCartAsync } from 'store/thunks';

const CartContainer: React.FC<IComponentProps> = ({ className }) => {
	const [isOrdered, setIsOrdered] = useState(false);

	const dispatch: AppDispatch = useDispatch();
	const cartDevices = useSelector(cartDevicesSelector);
	const modalCart = useSelector(modalCartIsOpen);
	const userId = useSelector(userIdSelector);

	const onClose = () => {
		dispatch(switchCartModal());
		setIsOrdered(false);
	};

	const onTakeOrder = () => {
		dispatch(takeOrder(userId));
		setIsOrdered(true);
		loadCartAsync(userId);
	};

	const ref = useClickAway<HTMLDivElement>(onClose);

	useEffect(() => {
		if (modalCart) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [modalCart]);

	if (!modalCart) {
		return null;
	}

	return (
		<div className={className}>
			<div className="drawer" ref={ref}>
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
							{cartDevices.map((item, index) => (
								<CartItem
									key={index}
									id={item.id}
									category={item.category}
									name={item.name}
									price={item.price}
									imageUrl={item.imageUrl}
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

	@media (max-width: 420px) {
		.drawer {
			width: auto;
		}
	}
`;
