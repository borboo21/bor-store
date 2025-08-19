import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { selectUserRoleIdSelector } from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { Order } from './components';
import { ROLE } from '../../../constants';
import type { IComponentProps, IOrder } from '../../../interfaces';
import styled from 'styled-components';

const OrdersContainer: React.FC<IComponentProps> = ({ className }) => {
	const userRole = useSelector(selectUserRoleIdSelector);

	const [orderInfo, setOrderInfo] = useState([]);
	const [error, setError] = useState('');

	const getOrders = () => {
		request(`/api/order/all`).then((ordersRes) => {
			if (ordersRes.error) {
				setError(ordersRes.error);
				return;
			}
			setOrderInfo(ordersRes.data);
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
				{orderInfo.map((orderItem: IOrder) => (
					<Order
						key={orderItem._id}
						_id={orderItem._id}
						login={orderItem.login}
						createdAt={orderItem.createdAt}
						items={orderItem.items}
					/>
				))}
			</div>
		</PrivateContent>
	);
};

export const Orders = styled(OrdersContainer)``;
