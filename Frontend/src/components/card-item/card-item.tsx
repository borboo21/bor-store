import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import {
	cartItemsSelector,
	userIdSelector,
	selectUserRoleIdSelector,
} from '../../selectors';
import { Loader, SkeletonMain, SkeletonMainMobile } from '../loaders';
import { useWindowSize } from '@uidotdev/usehooks';
import { useState } from 'react';
import styled from 'styled-components';
import {
	addCartAsync,
	addToCart,
	deleteFromCart,
	deleteFromCartAsync,
	type AppDispatch,
} from '../../store';
import type { ICardItem } from '../../interfaces';

const CardItemContainer: React.FC<ICardItem> = ({ className, loading, ...props }) => {
	const cartDevices = useSelector(cartItemsSelector);
	const userId = useSelector(userIdSelector);
	const roleId = useSelector(selectUserRoleIdSelector);
	const dispatch: AppDispatch = useDispatch();
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
	const windowSize = useWindowSize();

	const inCart: boolean = cartDevices.some((item) => item.device.id === props.id);

	const cartDevice = {
		device: {
			id: props.id,
			category: props.category,
			imageUrl: props.imageUrl,
			name: props.name,
			price: props.price,
		},
		quantity: 1,
	};

	const handleClickPlus = (userId: string) => {
		if (roleId !== 3) {
			dispatch(addCartAsync({ userId, deviceId: props.id, setIsLoadingSpinner }));
		} else {
			dispatch(addToCart(cartDevice));
			sessionStorage.setItem(
				'cartData',
				JSON.stringify([...cartDevices, cartDevice]),
			);
		}
	};

	const handleClickDelete = (id: string, userId: string) => {
		const findDevice = cartDevices.find((cartItem) => cartItem.device.id === id);
		if (findDevice) {
			const quantityInCart = findDevice.quantity;
			if (roleId !== 3) {
				dispatch(
					deleteFromCartAsync({
						deviceId: id,
						userId,
						price: props.price,
						quantity: quantityInCart,
						setIsLoadingSpinner,
					}),
				);
			} else {
				dispatch(
					deleteFromCart({
						deviceId: id,
						price: props.price,
						quantity: quantityInCart,
					}),
				);
			}
		}
	};

	return (
		<div className={className} key={props.key}>
			{loading ? (
				windowSize.width && windowSize.width <= 600 ? (
					<SkeletonMainMobile />
				) : (
					<SkeletonMain />
				)
			) : (
				<>
					<div className="device-image">
						<Link to={`/device/${props.category}/${props.id}`}>
							<img
								className="device-png"
								src={props.imageUrl}
								alt="device"
							/>
						</Link>
					</div>
					<div className="card-bottom">
						<h5 className="device-name">{props.name}</h5>
						<div className="buy-panel">
							<div className="price">
								<span className="price-title">Цена:</span>
								<b className="price-bold">{props.price}₽</b>
							</div>
							{!inCart ? (
								isLoadingSpinner ? (
									<Loader />
								) : (
									<CardButton
										icon={faPlus}
										color="#ffffff"
										onClick={() => handleClickPlus(userId)}
										isLoading={isLoadingSpinner}
									/>
								)
							) : isLoadingSpinner ? (
								<Loader />
							) : (
								<>
									<CounterItem
										className="counter-main"
										id={props.id}
										price={props.price}
									/>
									<CardButton
										icon={faCheck}
										color="#65ed65"
										onClick={() =>
											handleClickDelete(props.id, userId)
										}
										isLoading={isLoadingSpinner}
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

	transition: box-shadow 0.2s ease-in-out, transform 0.3s ease-in-out;

	&:hover {
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

	.device-png {
		width: 170px;
	}

	.device-name {
		margin: 10px 0 10px 0;
	}

	@media (max-width: 600px) {
		width: 145px;
		margin: 0 20px 20px 20px;

		.device-png {
			width: 100px;
		}
		.device-name {
			font-size: 10px;
		}
		.price-title {
			font-size: 8px;
		}
		.price-bold {
			font-size: 11px;
		}
		.buy-panel {
			height: 60px;
		}
		.counter-main {
			display: flex;
			margin: 8px 5px 0 5px;
			flex-direction: column-reverse;
		}
		.counter-button {
			width: 20px;
			height: 20px;
			font-size: 10px;
		}
		.counter-input {
			width: 20px;
			height: 20px;
			font-size: 10px;
		}
	}
`;
