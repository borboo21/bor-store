import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import {
	addCart,
	addCartAsync,
	deleteFromCart,
	deleteFromCartAsync,
} from '../../actions';
import { cartSelector, userSelector } from '../../selectors';
import { Loader, SkeletonMain } from '../loaders';
import { useState } from 'react';
import styled from 'styled-components';

const CardItemContainer = ({ className, dispatch, loading, ...props }) => {
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);
	const userId = user.id;
	const [isLoading, setIsLoading] = useState(false);

	const inCart = cart.devices.some((device) => device.deviceId === props.id);

	const device = {
		deviceId: props.id,
		category: props.category,
		imageUrl: props.imageUrl,
		name: props.name,
		price: props.price,
		quantity: 1,
	};

	const handleClickPlus = (userId) => {
		if (user.roleId !== 3) {
			dispatch(addCartAsync(userId, device, setIsLoading));
		} else {
			dispatch(addCart(device, props.price));
			sessionStorage.setItem('cartData', JSON.stringify([...cart.devices, device]));
		}
	};

	const handleClickDelete = (id, userId) => {
		const quantityInCart = cart.devices.find(
			(cartItem) => cartItem.deviceId === id,
		).quantity;
		user.roleId !== 3
			? dispatch(
					deleteFromCartAsync(
						id,
						userId,
						props.price,
						quantityInCart,
						setIsLoading,
					),
				)
			: dispatch(deleteFromCart(id, props.price, quantityInCart));
	};

	return (
		<div className={className}>
			{loading ? (
				<SkeletonMain />
			) : (
				<>
					<div className="device-image">
						<Link to={`/device/${props.category}/${props.id}`}>
							<img width={170} src={props.imageUrl} alt="device" />
						</Link>
					</div>
					<div className="card-bottom">
						<h5>{props.name}</h5>
						<div className="buy-panel">
							<div className="price">
								<span>Цена:</span>
								<b>{props.price}₽</b>
							</div>
							{!inCart ? (
								isLoading ? (
									<Loader />
								) : (
									<CardButton
										faIcon={faPlus}
										color="#ffffff"
										onClick={() => handleClickPlus(userId)}
										isLoading={isLoading}
									/>
								)
							) : isLoading ? (
								<Loader />
							) : (
								<>
									<CounterItem id={props.id} price={props.price} />
									<CardButton
										faIcon={faCheck}
										color="#65ed65"
										onClick={() =>
											handleClickDelete(props.id, userId)
										}
										isLoading={isLoading}
									/>
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const CardItem = styled(CardItemContainer)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border: 1px solid #ebe5e5;
	padding: 20px;
	width: 220px;
	border-radius: 20px;
	margin: 0 40px 40px 40px;
	transition:
		box-shadow 0.2s ease-in-out,
		transform 0.3s ease-in-out;

	&: hover {
		box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
		transform: translateY(-5px);
	}

	.card-bottom {
		display: flex;
		flex-direction: column;
	}

	.price {
		display: flex;
		flex-direction: column;
	}

	.buy-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
