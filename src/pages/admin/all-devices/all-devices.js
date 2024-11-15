import styled from 'styled-components';
import { BreadCrumbs } from '../../../components';
import { DeviceRow, TableRow } from './components';

import { URL } from '../../../constants';
import { useEffect, useState } from 'react';
import { request } from '../../../utils/request';

const AllPageContainer = ({ className }) => {
	const [device, setDevice] = useState([]);
	const [error, setError] = useState(null);
	const [shouldUpdateDeviceList, setShouldUpdateDeviceList] = useState(false);

	useEffect(() => {
		request(`${URL}/device`).then((deviceRes) => {
			if (deviceRes.error) {
				setError(deviceRes.error);
				return;
			}
			setDevice(deviceRes);
		});
	}, [shouldUpdateDeviceList]);

	console.log(shouldUpdateDeviceList);

	const onDelete = (deviceId) => {
		request(`${URL}/device/${deviceId}`, 'DELETE').then(() => {
			setShouldUpdateDeviceList(!shouldUpdateDeviceList);
		});
	};

	return (
		<div className={className}>
			<div className="all-page-header">
				<BreadCrumbs lastName={'Все товары'} />
			</div>
			<div className="all-page-main">
				<TableRow>
					<div className="table-header">
						<div className="category-column">Категория</div>
						<div className="name-column">Название</div>
						<div className="price-column">Цена</div>
						<div className="url-column">Ссылка на картинку</div>
					</div>
				</TableRow>
				{device.map(({ category, id, imageUrl, name, price }) => (
					<DeviceRow
						key={id}
						category={category}
						id={id}
						imageUrl={imageUrl}
						name={name}
						price={price}
						onDelete={() => onDelete(id)}
						shouldUpdateDeviceList={shouldUpdateDeviceList}
						setShouldUpdateDeviceList={setShouldUpdateDeviceList}
					/>
				))}
			</div>
		</div>
	);
};

export const AllPage = styled(AllPageContainer)`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	font-size: 18px;

	.all-page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
