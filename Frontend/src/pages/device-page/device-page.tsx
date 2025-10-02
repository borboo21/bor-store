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
	userIdSelector,
	selectUserRoleIdSelector,
	selectParams,
	selectVariantId,
	selectSpecId,
	selectActivePrice,
} from '../../selectors';
import {
	BreadCrumbs,
	ColorBlockDevice,
	CounterItem,
	Error,
	GreenButton,
} from '../../components';
import { Loader, SkeletonDevice, SkeletonDeviceMobile } from '../../components/loaders';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR, SPECS } from '../../constants';
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
import { DeviceSpecs } from '../../components/device-specs/device-specs';
import { selectDeviceVariants } from '../../selectors/device-selectors/select-device-variants';
import {
	findSpecId,
	setDeviceColor,
	setDeviceDiagonal,
	setDeviceRam,
	setDeviceSimType,
	setDeviceStorage,
} from '../../store/slices';
import { loadDeviceAsync } from '../../store/thunks/device-thunks';

const DevicePageContainer: React.FC<IComponentProps> = ({ className }) => {
	const [error, setError] = useState('');
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
	// const colorArr = ['#47537d', '#f7853f', '#e7e7e7'];

	const dispatch: AppDispatch = useDispatch();
	const params = useParams();
	const deviceId = useSelector(selectDeviceId);
	const deviceCategory = useSelector(selectDeviceCategory);
	const deviceName = useSelector(selectDeviceName);
	const deviceImageUrl = useSelector(selectDeviceImageURL);
	const cartDevices = useSelector(cartItemsSelector);
	const userId = useSelector(userIdSelector);
	const userRole = useSelector(selectUserRoleIdSelector);
	const deviceVariants = useSelector(selectDeviceVariants);
	const selectionParams = useSelector(selectParams);
	const variantId = useSelector(selectVariantId);
	const specId = useSelector(selectSpecId);
	const windowSize = useWindowSize();

	useEffect(() => {
		setIsLoadingSkeleton(true);
		if (params.id) {
			dispatch(loadDeviceAsync({ deviceId: params.id })).then((deviceData) => {
				console.log(deviceData.type);
				if (deviceData.type === 'device/loadDeviceAsync/rejected') {
					setError(ERROR.DEVICE_NOT_FOUND);
				}
				setIsLoadingSkeleton(false);
			});
		}
	}, [dispatch, params.id, setIsLoadingSkeleton]);

	const { color, colorName, imageUrl, storage, diagonal, ram, simType } =
		selectionParams;

	const deviceColors = deviceVariants.map((value) => {
		const id = value.variantId;
		const color = value.color;
		return { id, color };
	});

	const findDeviceVariant = deviceVariants.find(
		(value) => value.variantId === variantId,
	);

	if (!findDeviceVariant) {
		return <Error error={ERROR.DEVICE_NOT_FOUND}></Error>;
	}

	const onColorChange = (id: string) => {
		const findVariant = deviceVariants.find((variant) => variant.variantId === id);
		if (findVariant)
			dispatch(
				setDeviceColor({
					color: findVariant.color,
					colorName: findVariant.colorName,
					variantId: findVariant.variantId,
					imageURL: findVariant.imageUrl,
				}),
				dispatch(findSpecId(findVariant.specs)),
			);
	};

	const deviceSpecs = findDeviceVariant.specs;

	const onSpecChange = (specName: string, value: string) => {
		const findVariant = deviceVariants.find(
			(variant) => variant.variantId === variantId,
		);
		if (findVariant)
			switch (specName) {
				case SPECS.STORAGE:
					dispatch(setDeviceStorage(value));
					dispatch(findSpecId(findVariant.specs));
					break;
				case SPECS.RAM:
					dispatch(setDeviceRam(value));
					dispatch(findSpecId(findVariant.specs));
					break;
				case SPECS.DIAGONAL:
					dispatch(setDeviceDiagonal(value));
					dispatch(findSpecId(findVariant.specs));
					break;
				case SPECS.SIM:
					dispatch(setDeviceSimType(value));
					dispatch(findSpecId(findVariant.specs));
			}
	};

	const devicePrice = selectActivePrice(deviceSpecs, specId);

	const inCart = cartDevices.some((item) => item.device.id === deviceId);

	const handleClick = () => {
		if (devicePrice === 'Нет в наличии') {
			return;
		}
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
		if (devicePrice === 'Нет в наличии') {
			return;
		}
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
							<img width={310} src={imageUrl} alt={deviceName} />
						</div>
						<div className="device-description-block">
							<h1>{deviceName}</h1>
							<ColorBlockDevice
								className="device-color"
								colorArr={deviceColors}
								onColorChange={onColorChange}
							/>
							<DeviceSpecs
								variants={deviceSpecs}
								selectedSpecs={{
									'Объем памяти': storage!,
									ОЗУ: ram!,
									SIM: simType!,
									Диагональ: diagonal!,
								}}
								onSpecChange={onSpecChange}
							/>
							{devicePrice !== 'Нет в наличии' ? (
								<h2>{devicePrice}₽</h2>
							) : (
								<h2>{devicePrice}</h2>
							)}
							<div className="buy-container">
								{!inCart ? (
									!isLoadingSpinner ? (
										<GreenButton
											className="inCartButton"
											inсart={false}
											onClick={handleClick}
											disabled={devicePrice === 'Нет в наличии'}
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
		min-width: 370px;
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
