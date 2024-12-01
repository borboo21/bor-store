import { BreadCrumbs, CounterItem, GreenButton } from '../../components';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { cartSelector, selectDevice, userSelector } from '../../selectors';
import { addCartAsync, deleteFromCartAsync, loadDeviceAsync } from '../../actions';
import { addCart } from '../../actions/add-to-cart';
import { deleteFromCart } from '../../actions/delete-from-cart';
import styled from 'styled-components';

const DevicePageContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const params = useParams();
	const device = useSelector(selectDevice);
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);

	useEffect(() => {
		dispatch(loadDeviceAsync(params.id)).then((deviceData) => {
			setError(deviceData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id]);

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
			dispatch(addCartAsync(user.id, cartDevice));
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
					),
				)
			: dispatch(deleteFromCart(device.id, device.price, device.quantity));
	};

	if (isLoading) {
		return null;
	}

	return (
		<div className={className}>
			<div className="device-page-header">
				<BreadCrumbs lastName={device.name} />
			</div>
			<div className="device-card">
				<div className="img-block">
					<img width={310} src={device.imageUrl} alt={device.name} />
				</div>
				<div className="description">
					<h1>{device.name}</h1>
					<h2>{device.price}₽</h2>
					<div className="device-info"></div>
					<div className="buy-container">
						{!inCart ? (
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

	.device-page-header {
		display: flex;
		padding-bottom: 40px;
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
		padding: 0 30px 30px 30px;
	}

	.buy-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.counter {
		padding-left: 20px;
	}
	}
`;
