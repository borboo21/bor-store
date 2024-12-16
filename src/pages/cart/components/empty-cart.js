import styled from 'styled-components';
import { GreenButton } from '../../../components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EmptyCartContainer = ({ className, onClose }) => (
	<div className={className}>
		<img width={120} src="/img/empty-cart.png" alt="empty" />
		<div className="emptyCartDescription">
			<b className="empty-text">Корзина пустая</b>
			<span className="empty-description">
				Добавь любой девайс, чтобы сделать заказ!
			</span>
		</div>
		<GreenButton left={true} place={320} onClick={onClose} icon={faArrowLeft}>
			Вернуться назад
		</GreenButton>
	</div>
);

export const EmptyCart = styled(EmptyCartContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	justify-content: center;

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
`;
