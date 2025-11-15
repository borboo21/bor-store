import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { selectUserRoleIdSelector } from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { Order } from './components';
import { ROLE } from '../../../constants';
import type { IComponentProps } from '../../../interfaces';
import type { OrderDTO, OrdersResponseDTO } from '@shared/types';
import styled from 'styled-components';

const OrdersContainer: React.FC<IComponentProps> = ({ className }) => {
	const userRole = useSelector(selectUserRoleIdSelector);

	const [orderInfo, setOrderInfo] = useState<OrdersResponseDTO[]>([]);
	const [error, setError] = useState('');

	const getOrders = () => {
		request<OrdersResponseDTO[]>(`/api/order/all`).then((ordersRes) => {
			if (ordersRes.error) {
				setError(ordersRes.error);
				return;
			}
			const allOrders = ordersRes.data;
			setOrderInfo(allOrders);
		});
	};

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		getOrders();
	}, [userRole]);

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
			<div className={className}>
				<BreadCrumbs lastName={'Заказы'} />
				{orderInfo.map((orderItem: OrderDTO) => (
					<Order
						key={orderItem.id}
						id={orderItem.id}
						login={orderItem.login}
						createdAt={orderItem.createdAt}
						items={orderItem.items}
						amount={orderItem.amount}
					/>
				))}
			</div>
		</PrivateContent>
	);
};

export const Orders = styled(OrdersContainer)``;
