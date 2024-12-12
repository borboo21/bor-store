import styled from 'styled-components';
import { BreadCrumbs } from '../../../components';
import { useEffect, useState } from 'react';
import { request } from '../../../utils';
import { Order } from './components';

const OrdersContainer = ({ className }) => {
	const [orderInfo, setOrderInfo] = useState([]);

	const getOrders = () => {
		request(`/order/all`).then(({ data }) => {
			setOrderInfo(data);
		});
	};

	useEffect(() => {
		getOrders();
	}, [setOrderInfo]);

	return (
		<div className={className}>
			<BreadCrumbs lastName={'Заказы'} />
			{orderInfo.map((orderItem) => (
				<Order
					key={orderItem._id}
					id={orderItem._id}
					login={orderItem.login}
					createdAt={orderItem.createdAt}
					items={orderItem.items}
				/>
			))}
		</div>
	);
};

export const Orders = styled(OrdersContainer)``;
