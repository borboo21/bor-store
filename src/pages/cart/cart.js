import { CardButton, GreenButton } from '../../components';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../components/cart-item/cart-item';
import { cartSelector } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const CartContainer = ({ className, ...props }) => {
	const dispatch = useDispatch();
	const cart = useSelector(cartSelector);

	return (
		<div className={className}>
			<div className="drawer">
				<div className="cartHeader">
					<h2 className="cartName">Корзина</h2>
					<CardButton onClick={props.onClose} faIcon={faX} />
				</div>
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
							onClick={props.onClose}
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
									key={item.id}
									id={item.id}
									name={item.name}
									price={item.price}
									img={item.imageUrl}
									dispatch={dispatch}
									quantity={item.quantity}
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
							<GreenButton
								className="cartButton"
								right={true}
								place={20}
								onClick={props.onClose}
								icon={faArrowRight}
							>
								Оформить заказ
							</GreenButton>
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

	.drawer {
		display: flex;
		flex-direction: column;
		position: absolute;
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

	.cartItems {
		flex: 1;
		overflow: auto;
		margin-bottom: 40px;
	}

	.cartItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #ebe5e5;
		border-radius: 20px;
		overflow: hidden;
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
