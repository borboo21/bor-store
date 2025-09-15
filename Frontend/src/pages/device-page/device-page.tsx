import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useWindowSize } from '@uidotdev/usehooks';
import {
	cartItemsSelector,
	selectDeviceCategory,
	selectDeviceId,
	selectDeviceImageURL,
	selectDeviceName,
	selectDevicePrice,
	userIdSelector,
	selectUserRoleIdSelector,
} from '../../selectors';
import {
	BreadCrumbs,
	ColorBlock,
	CounterItem,
	Error,
	GreenButton,
	SpecBlock,
} from '../../components';
import { loadDeviceAsync } from '../../actions';
import { Loader, SkeletonDevice, SkeletonDeviceMobile } from '../../components/loaders';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR } from '../../constants';
import styled from 'styled-components';
import type { IComponentProps } from '../../interfaces';
import {
	addCartAsync,
	addToCart,
	deleteFromCart,
	deleteFromCartAsync,
	type AppDispatch,
} from '../../store';
import type { CartItemDTO } from '../../../../shared/types/interface';

const DevicePageContainer: React.FC<IComponentProps> = ({ className }) => {
	const [error, setError] = useState('');
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
	const memoryArr = ['128 Gb', '256 Gb', '512 Gb'];
	const colorArr = ['#47537d', '#f7853f', '#e7e7e7'];

	const dispatch: AppDispatch = useDispatch();
	const params = useParams();
	const deviceId = useSelector(selectDeviceId);
	const deviceCategory = useSelector(selectDeviceCategory);
	const deviceName = useSelector(selectDeviceName);
	const deviceImageUrl = useSelector(selectDeviceImageURL);
	const devicePrice = useSelector(selectDevicePrice);
	const cartDevices = useSelector(cartItemsSelector);
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

	const inCart = cartDevices.some((item) => item.device.id === deviceId);

	const cartDevice: CartItemDTO = {
		device: {
			id: deviceId,
			category: deviceCategory,
			imageUrl: deviceImageUrl,
			name: deviceName,
			price: devicePrice,
		},
		quantity: 1,
	};

	const handleClick = () => {
		if (userRole !== 3) {
			dispatch(addCartAsync({ userId, deviceId, setIsLoadingSpinner }));
		} else {
			dispatch(addToCart(cartDevice));
			sessionStorage.setItem(
				'cartData',
				JSON.stringify([...cartDevices, cartDevice]),
			);
		}
	};

	const onDelete = () => {
		const findCartItemQuantity = cartDevices.find(
			(item) => item.device.id === deviceId,
		);
		if (findCartItemQuantity) {
			const cartItemQuantity = findCartItemQuantity.quantity;
			if (userRole !== 3) {
				dispatch(
					deleteFromCartAsync({
						userId,
						deviceId,
						price: devicePrice,
						quantity: cartItemQuantity,
						setIsLoadingSpinner,
					}),
				);
			} else {
				dispatch(
					deleteFromCart({
						deviceId,
						price: devicePrice,
						quantity: cartItemQuantity,
					}),
				);
			}
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
						<div className="device-description-block">
							<h1>{deviceName}</h1>
							<SpecBlock
								specArr={memoryArr}
								specName="Объем Памяти"
								paddingTag="6px 12px"
								fontSizeTag={13}
							/>
							<ColorBlock className="device-color" colorArr={colorArr} />
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

	.device-description-block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		box-shadow: 0 0 24px 0 rgba(27, 30, 37, 0.08);
		border-radius: 20px;
		padding: 20px;
	}

	.device-memory {
		margin: 15px 0;
	}

	.device-color {
		margin: 15px 0;
	}

	.buy-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.counter {
		padding-left: 20px;
	}

	.memory-tag {
		margin: 0 4px;
	}

	.color-tag {
		margin: 8px 4px;
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
