import { BreadCrumbs, CounterItem, GreenButton } from '../../components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectDevice } from '../../selectors';
import { loadDeviceAsync } from '../../actions';
import styled from 'styled-components';

const DevicePageContainer = ({ className }) => {
	const [error, setError] = useState(null);

	const dispatch = useDispatch();
	const params = useParams();
	const device = useSelector(selectDevice);

	console.log(device);

	useEffect(() => {
		dispatch(loadDeviceAsync(params.id)).then((deviceData) => {
			setError(deviceData.error);
		});
	}, [dispatch, params.id]);

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
						<CounterItem className="counter" />
						<GreenButton>
							В корзину <FontAwesomeIcon icon={faArrowRight} />
						</GreenButton>
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
		padding-right: 20px;
	}
`;
