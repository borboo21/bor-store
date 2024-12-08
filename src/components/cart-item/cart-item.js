import { faX } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import { deleteFromCart, deleteFromCartAsync } from '../../actions';
import { Loader } from '../loaders';
import styled from 'styled-components';

const cartItemContainer = ({ className, dispatch, userId, userRole, ...props }) => {
	const handleClickX = () => {
		userRole !== 3
			? dispatch(
					deleteFromCartAsync(
						props.id,
						userId,
						props.price,
						props.quantity,
						props.setIsLoading,
					),
				)
			: dispatch(deleteFromCart(props.id, props.price, props.quantity));
	};

	return (
		<div className={className}>
			<img width={90} src={props.img} alt="device" />
			<div className="deviceInfo">
				<p className="deviceName">{props.name}</p>
				<b>{props.price}₽</b>
				<CounterItem
					id={props.id}
					price={props.price}
					quantity={props.quantity}
				/>
			</div>
			{props.isLoading ? (
				<Loader />
			) : (
				<CardButton faIcon={faX} onClick={handleClickX} />
			)}
		</div>
	);
};

export const CartItem = styled(cartItemContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ebe5e5;
	border-radius: 20px;
	overflow: hidden;
	padding: 20px;
	margin-bottom: 20px;

	.deviceInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 120px;
		margin-right: 10px;
		font-size: 16px;
	}

	.deviceName {
		margin-bottom: 5px;
	}
`;
