import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useWindowSize } from '@uidotdev/usehooks';
import {
	cartDevicesSelector,
	selectDeviceCategory,
	selectDeviceId,
	selectDeviceImageURL,
	selectDeviceName,
	selectDevicePrice,
	userIdSelector,
	selectUserRoleIdSelector,
} from '../../selectors';
import { BreadCrumbs, CounterItem, Error, GreenButton } from '../../components';
import { loadDeviceAsync } from '../../actions';
import { addToCart, deleteFromCart } from 'store/slices';
import { Loader, SkeletonDevice, SkeletonDeviceMobile } from '../../components/loaders';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR } from '../../constants';
import { ICartDevice, IComponentProps } from 'interfaces/interface';
import { addCartAsync, deleteFromCartAsync } from 'store/thunks';
import { AppDispatch } from 'store/store';
import styled from 'styled-components';

const DevicePageContainer: React.FC<IComponentProps> = ({ className }) => {
	const [error, setError] = useState('');
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

	const dispatch: AppDispatch = useDispatch();
	const params = useParams();
	const deviceId = useSelector(selectDeviceId);
	const deviceCategory = useSelector(selectDeviceCategory);
	const deviceName = useSelector(selectDeviceName);
	const deviceImageUrl = useSelector(selectDeviceImageURL);
	const devicePrice = useSelector(selectDevicePrice);
	const cartDevices = useSelector(cartDevicesSelector);
	const userId = useSelector(userIdSelector);
	const userRole = useSelector(selectUserRoleIdSelector);
	const windowSize = useWindowSize();

	useEffect(() => {
		setIsLoadingSkeleton(true);
		if (params.id) {
			dispatch(loadDeviceAsync(params.id)).then((deviceData) => {
				if (deviceData.error) {
					setError(ERROR.DEVICE_NOT_FOUND);
				}
				setIsLoadingSkeleton(false);
			});
		}
	}, [dispatch, params.id, setIsLoadingSkeleton]);

	const inCart = cartDevices.some((item) => item.id === deviceId);

	const cartDevice: ICartDevice = {
		id: deviceId,
		category: deviceCategory,
		imageUrl: deviceImageUrl,
		name: deviceName,
		price: devicePrice,
		quantity: 1,
	};

	const handleClick = () => {
		if (userRole !== 3) {
			dispatch(addCartAsync({ userId, cartDevice, setIsLoadingSpinner }));
		} else {
			dispatch(addToCart(cartDevice));
			sessionStorage.setItem(
				'cartData',
				JSON.stringify([...cartDevices, cartDevice]),
			);
		}
	};

	const onDelete = () => {
		const findCartItemQuantity = cartDevices.find((item) => item.id === deviceId);
		if (findCartItemQuantity) {
			const cartItemQuantity = findCartItemQuantity.quantity;
			userRole !== 3
				? dispatch(
						deleteFromCartAsync({
							id: deviceId,
							userId,
							price: devicePrice,
							quantity: cartItemQuantity,
							setIsLoadingSpinner,
						}),
					)
				: dispatch(
						deleteFromCart({
							id: deviceId,
							price: devicePrice,
							quantity: cartItemQuantity,
						}),
					);
		}
	};

	return (
		<div className={className}>
			{error ? (
				<Error error={error} />
			) : isLoadingSkeleton ? (
				windowSize.width && windowSize.width >= 800 ? (
					<SkeletonDevice />
				) : (
					<SkeletonDeviceMobile />
				)
			) : (
				<>
					<BreadCrumbs lastName={deviceName} />
					<div className="device-card">
						<div className="img-block">
							<img width={310} src={deviceImageUrl} alt={deviceName} />
						</div>
						<div className="description">
							<h1>{deviceName}</h1>
							<h2>{devicePrice}₽</h2>
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
											id={deviceId}
											price={devicePrice}
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
