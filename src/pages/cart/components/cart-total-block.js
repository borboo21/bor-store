import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { GreenButton } from '../../../components';
import styled from 'styled-components';

const CartTotalBlockContainer = ({ className, cart, userId, onClose, onTakeOrder }) => (
	<div className={className}>
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
);

export const CartTotalBlock = styled(CartTotalBlockContainer)`
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

	a {
		border-bottom: 1px solid #000000;
	}
`;
