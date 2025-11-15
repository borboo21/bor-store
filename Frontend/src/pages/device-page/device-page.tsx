import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useWindowSize } from '@uidotdev/usehooks';
import {
	cartItemsSelector,
	selectDeviceCategory,
	selectDeviceId,
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
	ImageWithSkeleton,
} from '../../components';
import { Loader, SkeletonDevice, SkeletonDeviceMobile } from '../../components/loaders';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR, SPECS } from '../../constants';
import type { IComponentProps } from '../../interfaces';
import {
	addCartAsync,
	addToCart,
	deleteFromCart,
	deleteFromCartAsync,
	type AppDispatch,
} from '../../store';
import type { CartItemDTO } from '@shared/types';
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
import styled from 'styled-components';

const DevicePageContainer: React.FC<IComponentProps> = ({ className }) => {
	const [error, setError] = useState('');
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

	const dispatch: AppDispatch = useDispatch();
	const params = useParams();
	const deviceId = useSelector(selectDeviceId);
	const deviceCategory = useSelector(selectDeviceCategory);
	const deviceName = useSelector(selectDeviceName);
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
		setError('');
		if (!params.id) return;
		dispatch(loadDeviceAsync({ deviceId: params.id }))
			.unwrap()
			.catch(() => setError(ERROR.DEVICE_NOT_FOUND))
			.finally(() => setIsLoadingSkeleton(false));
	}, [dispatch, params.id]);

	if (isLoadingSkeleton) {
		return windowSize.width && windowSize.width >= 800 ? (
			<SkeletonDevice />
		) : (
			<SkeletonDeviceMobile />
		);
	}

	const findDeviceVariant = deviceVariants.find(
		(value) => value.variantId === variantId,
	);

	if (!findDeviceVariant || !deviceVariants.length || error) {
		return <Error error={error}></Error>;
	}

	const { color, colorName, imageUrl, storage, diagonal, ram, simType } =
		selectionParams;

	const deviceColors = deviceVariants.map((value) => {
		const id = value.variantId;
		const color = value.color;
		return { id, color };
	});

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

	const formattedPrice = devicePrice.toLocaleString('ru');

	const inCart = cartDevices.some((item) => item.device.specId === specId);

	const handleClick = () => {
		if (devicePrice === 'Нет в наличии') {
			return;
		}
		const cartDevice: CartItemDTO = {
			device: {
				deviceId: deviceId,
				category: deviceCategory,
				name: deviceName,
				variantId: variantId,
				color: color,
				colorName: colorName,
				imageUrl: imageUrl,
				specId: specId,
				storage: storage,
				diagonal: diagonal,
				ram: ram,
				simType: simType,
				price: devicePrice,
			},
			quantity: 1,
		};
		if (userRole !== 3) {
			dispatch(
				addCartAsync({
					userId,
					deviceId,
					variantId,
					specId,
					setIsLoadingSpinner,
				}),
			);
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
			(item) => item.device.specId === specId,
		);
		if (findCartItemQuantity) {
			const cartItemQuantity = findCartItemQuantity.quantity;
			if (userRole !== 3) {
				dispatch(
					deleteFromCartAsync({
						userId,
						specId,
						price: devicePrice,
						quantity: cartItemQuantity,
						setIsLoadingSpinner,
					}),
				);
			} else {
				dispatch(
					deleteFromCart({
						specId,
						price: devicePrice,
						quantity: cartItemQuantity,
					}),
				);
			}
		}
	};

	return (
		<div className={className}>
			<BreadCrumbs lastName={deviceName} />
			<div className="device-card">
				<div className="img-block">
					<ImageWithSkeleton src={imageUrl} />
				</div>
				<div className="device-description-block">
					<h1 className="device-name">{deviceName}</h1>
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
						<h2>{formattedPrice}₽</h2>
					) : (
						<h2>{formattedPrice}</h2>
					)}
					<div className="buy-container">
						{!inCart ? (
							!isLoadingSpinner ? (
								<GreenButton
									className="in-cart-button"
									$inсart={false}
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
						) : !isLoadingSpinner && devicePrice !== 'Нет в наличии' ? (
							<>
								<GreenButton
									className="out-from-cart-button"
									$inсart={true}
									onClick={onDelete}
									left={true}
									place={185}
									icon={faArrowLeft}
								>
									Убрать из корзины
								</GreenButton>
								<CounterItem
									className="counter"
									specId={specId}
									price={devicePrice as number}
								/>
							</>
						) : (
							<Loader />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const DevicePage = styled(DevicePageContainer)`
	.device-card {
		display: flex;
		align-items: center;
	}

	.device-name {
		margin-bottom: 5px;
		margin-top: 5px;
	}

	.img-block {
		margin-right: 50px;
		margin-bottom: 30px;
		max-width: 306px;
	}

	.in-cart-button {
		width: 210px;
	}

	.out-from-cart-button {
		width: 210px;
	}

	.device-description-block {
		min-width: 370px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		box-shadow: 0 0 24px 0 rgba(27, 30, 37, 0.08);
		border-radius: 20px;
		padding: 30px 20px;
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
		min-height: 55px;
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

	& .device-png {
		width: 306px;
	}

	@media (max-width: 800px) {
		.device-card {
			flex-direction: column;
		}
		.img-block {
			margin-right: 0;
		}
		.description {
			width: 350px;
			margin-top: 30px;
		}
	}

	@media (max-width: 370px) {
		.device-description-block {
			min-width: 310px;
			padding: 20px 8px;

			& .spec-block {
				justify-content: flex-start;
			}
		}
	}
`;
