import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { cartSelector, selectDevice, userSelector } from '../../selectors';
import { BreadCrumbs, CounterItem, Error, GreenButton } from '../../components';
import {
	addCartAsync,
	deleteFromCartAsync,
	loadDeviceAsync,
	deleteFromCart,
	addCart,
} from '../../actions';
import { Loader, SkeletonDevice } from '../../components/loaders';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR } from '../../constants';
import styled from 'styled-components';

const DevicePageContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

	const dispatch = useDispatch();
	const params = useParams();
	const device = useSelector(selectDevice);
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);

	useEffect(() => {
		setIsLoadingSkeleton(true);
		dispatch(loadDeviceAsync(params.id)).then((deviceData) => {
			if (deviceData.error) {
				setError(ERROR.DEVICE_NOT_FOUND);
			}
			setIsLoadingSkeleton(false);
		});
	}, [dispatch, params.id, setIsLoadingSkeleton]);

	const inCart = cart.devices.some((item) => item.deviceId === device.id);

	const cartDevice = {
		deviceId: device.id,
		category: device.category,
		imageUrl: device.imageUrl,
		name: device.name,
		price: device.price,
		quantity: 1,
	};

	const handleClick = () => {
		if (user.roleId !== 3) {
			dispatch(addCartAsync(user.id, cartDevice, setIsLoadingSpinner));
		} else {
			dispatch(addCart(cartDevice, device.price));
			sessionStorage.setItem(
				'cartData',
				JSON.stringify([...cart.devices, cartDevice]),
			);
		}
	};

	const onDelete = () => {
		const cartItemQuantity = cart.devices.find(
			(item) => item.deviceId === device.id,
		).quantity;
		user.roleId !== 3
			? dispatch(
					deleteFromCartAsync(
						device.id,
						user.id,
						device.price,
						cartItemQuantity,
						setIsLoadingSpinner,
					),
				)
			: dispatch(deleteFromCart(device.id, device.price, device.quantity));
	};

	return (
		<div className={className}>
			{error ? (
				<Error error={error} />
			) : isLoadingSkeleton ? (
				<SkeletonDevice />
			) : (
				<>
					<BreadCrumbs lastName={device.name} />
					<div className="device-card">
						<div className="img-block">
							<img width={310} src={device.imageUrl} alt={device.name} />
						</div>
						<div className="description">
							<h1>{device.name}</h1>
							<h2>{device.price}₽</h2>
							<div className="buy-container">
								{!inCart ? (
									!isLoadingSpinner ? (
										<GreenButton
											className="inCartButton"
											inсart={false}
											onClick={handleClick}
											right={true}
											place={20}
											icon={faArrowRight}
										>
											В корзину
										</GreenButton>
									) : (
										<Loader />
									)
								) : !isLoadingSpinner ? (
									<>
										<GreenButton
											className="outFromCartButton"
											inсart={true}
											onClick={onDelete}
											left={true}
											place={200}
											icon={faArrowLeft}
										>
											Убрать из корзины
										</GreenButton>
										<CounterItem
											className="counter"
											id={device.id}
											price={device.price}
										/>
									</>
								) : (
									<Loader />
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const DevicePage = styled(DevicePageContainer)`
	.device-card {
		display: flex;
		align-items: center;
	}

	.img-block {
		margin-right: 46px;
	}

	.description {
		width: 400px;
		height: 400px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		box-shadow: 0 0 24px 0 rgba(27, 30, 37, 0.08);
		border-radius: 20px;
		padding-left: 20px;
	}

	.buy-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.counter {
		padding-left: 20px;
	}

	@media (max-width: 800px) {
		.device-card {
			flex-direction: column;
		}
		.description {
			width: 350px;
			margin-top: 30px;
		}
	}
`;
