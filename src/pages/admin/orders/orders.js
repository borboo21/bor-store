import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { userSelector } from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { Order } from './components';
import { ROLE } from '../../../constants';
import styled from 'styled-components';

const OrdersContainer = ({ className }) => {
	const user = useSelector(userSelector);

	const [orderInfo, setOrderInfo] = useState([]);
	const [error, setError] = useState('');

	const getOrders = () => {
		request(`/order/all`).then((ordersRes) => {
			if (ordersRes.error) {
				setError(ordersRes.error);
				return;
			}
			setOrderInfo(ordersRes.data);
		});
	};

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}
		getOrders();
	}, [user.roleId]);

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} error={error}>
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
			</PrivateContent>
		</div>
	);
};

export const Orders = styled(OrdersContainer)``;
