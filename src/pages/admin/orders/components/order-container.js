import moment from 'moment/moment';
import styled from 'styled-components';

const OrderContainer = ({ className, ...props }) => {
	function formatDate(isoDate) {
		return moment(isoDate).format('DD.MM.YYYY HH:mm');
	}

	return (
		<div className={className}>
			<div className="header">
				<div className="first">
					<span className="head-info">{props.id}</span>
				</div>
				<div className="second">
					<span className="order">В заказе:</span>
				</div>
				<div className="third-header">
					<span className="amount">Сумма:</span>
				</div>
				<div className="fourth">
					<span className="payment">Платеж:</span>
				</div>
			</div>
			<div className="base">
				<div className="info">
					<span className="name">{props.login}</span>
					<span className="date">{formatDate(props.createdAt)}</span>
				</div>
				<div className="vertical-line"></div>
				<div className="second">
					{props.items.map((item) => (
						<li key={item._id} className="cartItem">
							{item.name} — {item.quantity} шт.
						</li>
					))}
				</div>
				<div className="vertical-line"></div>
				<div className="third-base">
					<span className="amount">
						{props.items.reduce(
							(sum, device) => sum + device.price * device.quantity,
							0,
						)}{' '}
						₽
					</span>
				</div>
				<div className="vertical-line"></div>
				<div className="fourth">
					<span className="payment">Прошел</span>
				</div>
			</div>
		</div>
	);
};

export const Order = styled(OrderContainer)`
	width: 968px;
	flex-shrink: 0;
	border-radius: 20px;
	border: 1px solid #f0f0f0;
	background: #f7f7f7;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	font-size: 15px;
	margin-bottom: 16px;

	.header {
		display: flex;
		flex-direction: row;
		width: 968px;
		justify-content: space-between;
		margin: 16px 16px 0;
		align-items: center;
	}

	.head-info {
		border-radius: 26px;
		background: #eaeaea;
		display: inline-flex;
		padding: 2px 10px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-size: 12px;
		margin-bottom: 15px;
	}

	.order {
		display: flex;
	}

	.base {
		display: flex;
		width: 968px;
		justify-content: space-between;
		margin: 0 16px 16px;
	}

	.vertical-line {
		border: 1px solid #dfdfdf;
	}

	.info {
		width: 120px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.date {
		font-size: 10px;
	}

	.second {
		width: 240px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 15px;
	}

	.third-header {
		width: 100px;
	}

	.third-base {
		display: flex;
		justify-content: center;
		width: 100px;
	}

	.fourth {
		width: 100px;
	}
`;
