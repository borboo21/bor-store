import styled from 'styled-components';
import { BreadCrumbs, CounterItem, GreenButton } from '../../components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DevicePageContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="device-page-header">
				<BreadCrumbs lastName={'iPhone 11'} />
			</div>
			<div className="device-card">
				<div className="img-block">
					<img width={310} src={'/img/11.jpg'} alt={'iPhone'} />
				</div>
				<div className="description">
					<h1>iPhone 11</h1>
					<h2>39 990₽</h2>
					<div className="device-info"></div>
					<div className="buy-container">
						<CounterItem className="counter" />
						<GreenButton>
							Добавить в корзину <FontAwesomeIcon icon={faArrowRight} />
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
		box-shadow: 0 0 24px 0 rgba(27, 30, 37, 0.08);
		border-radius: 20px;
		padding: 0 30px 30px 30px;
	}

	.buy-container {
		display: flex;
		flex-direction: column;
	}
	.counter {
		padding-bottom: 20px;
	}
`;
