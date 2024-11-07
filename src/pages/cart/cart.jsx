import styled from 'styled-components';
import { CardButton, GreenButton } from '../../components';
import { faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartItem } from '../../components/cart-item/cart-item';

const CartContainer = ({ className, ...props }) => {
	const arr = [
		{ id: 1, name: 'iPhone 11', price: 39990, img: '/img/11.jpg' },
		{ id: 2, name: 'iPhone 12', price: 49990, img: '/img/12.jpeg' },
		{ id: 3, name: 'iPhone 13', price: 59990, img: '/img/13.jpg' },
		{ id: 4, name: 'iPhone 14', price: 69990, img: '/img/14.jpeg' },
	];

	return (
		<div className={className}>
			<div className="drawer">
				<h2>
					Корзина <CardButton onClick={props.onClose} faIcon={faX} />
				</h2>
				<div className="cartItems">
					{arr.map((item) => (
						<CartItem
							key={item.id}
							name={item.name}
							price={item.price}
							img={item.img}
						/>
					))}
				</div>
				<div className="cartTotalBlock">
					<ul>
						<li className="sum">
							<span>Итого:</span>
							<div></div>
							<b>50 000 ₽</b>
						</li>
						<li className="bonus">
							<span>Бонусов к начислению:</span>
							<div></div>
							<b>1 000 баллов</b>
						</li>
					</ul>
					<GreenButton>
						Оформить заказ <FontAwesomeIcon icon={faArrowRight} />
					</GreenButton>
				</div>
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
		button {
			position: relative;

			&:hover {
				svg {
					transform: translateX(5px);
				}
			}
			svg {
				position: absolute;
				right: 30px;
				top: 20px;
				transition: transform 0.15s ease-in-out;
			}
		}
	}

	h2 {
		display: flex;
		justify-content: space-between;
		margin: 0 0 30px 0;
	}
`;
