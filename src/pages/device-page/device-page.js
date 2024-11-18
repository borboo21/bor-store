import { BreadCrumbs, CounterItem, GreenButton } from '../../components';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { cartSelector, selectDevice } from '../../selectors';
import { addCartAsync, deleteFromCartAsync, loadDeviceAsync } from '../../actions';
import styled from 'styled-components';

const DevicePageContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const params = useParams();
	const device = useSelector(selectDevice);
	const cart = useSelector(cartSelector);

	useEffect(() => {
		dispatch(loadDeviceAsync(params.id)).then((deviceData) => {
			setError(deviceData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id]);

	const inCart = cart.devices.some((item) => item.id === device.id);
	console.log(inCart);

	const handleClick = () => {
		dispatch(
			addCartAsync({
				id: device.id,
				category: device.category,
				imageUrl: device.imageUrl,
				name: device.name,
				price: device.price,
				quantity: 1,
			}),
		);
	};

	const onDelete = () => {
		const cartItemQuantity = cart.devices.find(
			(item) => item.id === device.id,
		).quantity;
		dispatch(deleteFromCartAsync(device.id, device.price, cartItemQuantity));
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
								inCart={false}
								onClick={handleClick}
								right={true}
								place={'20px'}
							>
								В корзину <FontAwesomeIcon icon={faArrowRight} />
							</GreenButton>
						) : (
							<>
								<GreenButton
									className="outFromCartButton"
									inCart={true}
									onClick={onDelete}
									left={true}
									place={'200px'}
								>
									<FontAwesomeIcon icon={faArrowLeft} />
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
		align-items: flex-start;
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
