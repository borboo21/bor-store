import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardButton, GreenButton, CartItem } from '../../components';
import { cartSelector, userSelector, appSelector } from '../../selectors';
import { useClickAway } from '@uidotdev/usehooks';
import { clearCart, loadCartAsync, switchModal, takeOrder } from '../../actions';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);
	const app = useSelector(appSelector);
	const userId = user.id;
	const userRole = user.roleId;

	const onClose = () => dispatch(switchModal());
	const onTakeOrder = () => {
		takeOrder(userId);
		dispatch(clearCart());
		loadCartAsync();
		onClose();
	};

	const ref = useClickAway(onClose);

	useEffect(() => {
		if (app.modalIsOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [app.modalIsOpen]);

	if (!app.modalIsOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="drawer" ref={ref}>
				{cart.devices.length !== 0 && (
					<div className="cartHeader">
						<h2 className="cartName">Корзина</h2>
						<CardButton onClick={onClose} faIcon={faX} />
					</div>
				)}
				{cart.devices.length === 0 ? (
					<div className="emptyCart">
						<img width={120} src="/img/empty-cart.png" alt="empty" />
						<div className="emptyCartDescription">
							<b className="empty-text">Корзина пустая</b>
							<span className="empty-description">
								Добавь любой девайс, чтобы сделать заказ!
							</span>
						</div>
						<GreenButton
							className="cartButton"
							left={true}
							place={320}
							onClick={onClose}
							icon={faArrowLeft}
						>
							Вернуться назад
						</GreenButton>
					</div>
				) : (
					<div>
						<div className="cartItems">
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
						<div className="cartTotalBlock">
							<ul>
								<li className="sum">
									<span>Итого:</span>
									<div></div>
									<b>{cart.amount}₽</b>
								</li>
								<li className="bonus">
									<span>Бонусов к начислению:</span>
									<div></div>
									<b>{Math.floor(cart.amount * 0.02)}₽</b>
								</li>
							</ul>
							{userId ? (
								<GreenButton
									className="cartButton"
									right={true}
									place={20}
									onClick={onTakeOrder}
									icon={faArrowRight}
								>
									Оформить заказ
								</GreenButton>
							) : (
								<span className="not-user-description">
									<Link to={'/login'} onClick={onClose}>
										{' '}
										Войдите
									</Link>{' '}
									или{' '}
									<Link to={'/register'} onClick={onClose}>
										{' '}
										зарегистрируйтесь
									</Link>
									, чтобы сделать заказ!
								</span>
							)}
						</div>
					</div>
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
	overFlow: hidden;

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

	.cartHeader {
		display: flex;
		align-items: center;
    	justify-content: space-between;
	}

	.emptyCart {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: center;

	}

	.emptyCartDescription {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty-text {
		padding: 15px;
    	font-size: 22px;
	}

	.empty-description {
		padding-bottom: 15px;
	}

	.not-user-description {
		font-size: 18px;
		a {
			text-decoration: underline;
		}
	}

	.cartItems {
		flex: 1;
		overflow: auto;
		margin-bottom: 40px;
		height: 63%;
		padding-right: 10px;
	}

	.cartItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #ebe5e5;
		border-radius: 20px;
		padding: 20px;
		margin-bottom: 20px;
		}

	.deviceInfo {
		margin-right: 10px;
		font-size: 16px;
	}

	.deviceName {
		margin-bottom: 5px;
	}

	.cartTotalBlock {
	text-align: center;
		ul {
			padding-inline-start: 0px;
			margin-bottom: 40px;
		}
		li {
			display: flex;
			align-items: flex-end;
			margin-bottom: 20px;
		}
		div {
			flex: 1;
			height: 1px;
			border-bottom: 1px dashed #dfdfdf;
			position: relative;
			top: -4px;
			margin: 0 7px;
		}

	.cartName {
		display: flex;
		justify-content: space-between;
		margin: 0 0 30px 0;
	}
`;
