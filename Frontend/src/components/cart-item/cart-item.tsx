import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../loaders';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import { deleteFromCart, deleteFromCartAsync, type AppDispatch } from '../../store';
import { selectUserRoleIdSelector, userIdSelector } from '../../selectors';
import type { ICartDevice } from '../../interfaces';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CartItemContainer: React.FC<ICartDevice> = ({ className, ...props }) => {
	const dispatch: AppDispatch = useDispatch();
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
	const userId = useSelector(userIdSelector);
	const userRole = useSelector(selectUserRoleIdSelector);

	const handleClickX = () => {
		userRole !== 3
			? dispatch(
					deleteFromCartAsync({
						id: props.id,
						userId,
						price: props.price,
						quantity: props.quantity,
						setIsLoadingSpinner,
					}),
			  )
			: dispatch(
					deleteFromCart({
						id: props.id,
						price: props.price,
						quantity: props.quantity,
					}),
			  );
	};

	return (
		<div className={className}>
			<img width={90} src={props.imageUrl} alt="device" />
			<div className="device-info">
				<p className="device-name">{props.name}</p>
				<b>{props.price}₽</b>
				<CounterItem id={props.id} price={props.price} />
			</div>
			{isLoadingSpinner ? (
				<Loader />
			) : (
				<CardButton icon={faX} onClick={handleClickX} />
			)}
		</div>
	);
};

export const CartItem = styled(CartItemContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ebe5e5;
	border-radius: 20px;
	padding: 20px;
	margin-bottom: 20px;

	.device-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 120px;
		margin-right: 10px;
		font-size: 16px;
	}

	.device-name {
		margin-bottom: 5px;
		text-align: center;
	}

	@media (max-width: 420px) {
		.device-info {
			margin: 0 10px 0 10px;
			font-size: 16px;
		}
	}
`;
