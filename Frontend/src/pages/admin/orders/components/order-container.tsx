import moment from 'moment/moment';
import styled from 'styled-components';
import type { IOrderComponent } from '../../../../interfaces';

const OrderContainer: React.FC<IOrderComponent> = ({ className, ...props }) => {
	function formatDate(isoDate: string) {
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
					{props.items.map((item, index) => (
						<ul key={index} className="cartItem">
							<b>{item.name}</b>
							{item.diagonal && <li>Диагональ: {item.diagonal}</li>}
							{item.ram && <li>ОЗУ: {item.ram}</li>}
							{item.storage && <li>Память: {item.storage}</li>}
							{item.simType && <li>Способ связи: {item.simType}</li>}
							{item.colorName && <li> Цвет: {item.colorName}</li>}
							<li>Цена: {`${item.price.toLocaleString('ru')}₽`}</li>
							<li>Количество: {item.quantity} шт.</li>
						</ul>
					))}
				</div>
				<div className="vertical-line"></div>
				<div className="third-base">
					<span className="amount">{`${props.amount}₽`}</span>
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
		font-size: 11px;
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

	.cartItem {
		padding: 0 0 0 20px;
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

	@media (max-width: 968px) {
		width: 600px;
		font-size: 9px;

		.second {
			font-size: 9px;
			width: 140px;
		}
		.head-info {
			font-size: 8px;
		}
		.third-header {
			width: 50px;
		}
		.third-base {
			width: 70px;
		}
		.fourth {
			width: 50px;
		}
		.date {
			font-size: 7px;
		}
	}

	@media (max-width: 600px) {
		width: 320px;
		font-size: 8px;

		.info {
			width: 100px;
		}
		.second {
			font-size: 8px;
			width: 95px;
		}
		.head-info {
			font-size: 6px;
		}
		.third-header {
			width: 30px;
		}
		.third-base {
			width: 43px;
		}
		.fourth {
			width: 30px;
		}
		.date {
			font-size: 7px;
		}
	}
`;
