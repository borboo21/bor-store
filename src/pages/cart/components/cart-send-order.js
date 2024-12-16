import styled from 'styled-components';
import { GreenButton } from '../../../components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CartSendOrderContainer = ({ className, onClose }) => (
	<div className={className}>
		<img width={120} src="/img/ready-order.png" alt="empty" />
		<div className="cart-description">
			<b className="cart-text">Заказ оформлен</b>
			<span className="cart-description">
				Ожидайте, с вами свяжется наш менеджер!
			</span>
		</div>
		<GreenButton left={true} place={320} onClick={onClose} icon={faArrowLeft}>
			Вернуться назад
		</GreenButton>
	</div>
);

export const CartSendOrder = styled(CartSendOrderContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	justify-content: center;

	.cart-description {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cart-text {
		padding: 15px;
		font-size: 22px;
		color: #9dd558;
	}

	.cart-description {
		padding-bottom: 15px;
	}
`;
