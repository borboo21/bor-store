import { BreadCrumbs } from '../../../components';
import { DeviceRow, TableRow } from './components';
import { useEffect, useState } from 'react';
import { request } from '../../../utils/request';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../constants';
import { PrivateContent } from '../../../components/private-content/private-content';
import styled from 'styled-components';

const AllPageContainer = ({ className }) => {
	const [device, setDevice] = useState([]);
	const [error, setError] = useState(null);
	const [shouldUpdateDeviceList, setShouldUpdateDeviceList] = useState(false);

	const user = useSelector(userSelector);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}
		request('/device/all').then((deviceRes) => {
			console.log(deviceRes.data);
			if (deviceRes.error) {
				setError(deviceRes.error);
				return;
			}
			setDevice(deviceRes.data);
		});
	}, [shouldUpdateDeviceList, user.roleId]);

	const onDelete = (deviceId) => {
		request(`/device/${deviceId}`, 'DELETE').then(() => {
			setShouldUpdateDeviceList(!shouldUpdateDeviceList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} error={error}>
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
							<div className="url-column">Ссылка</div>
						</div>
					</TableRow>
					{device.map(({ category, _id, imageUrl, name, price }) => (
						<DeviceRow
							key={_id}
							id={_id}
							category={category}
							imageUrl={imageUrl}
							name={name}
							price={price}
							onDelete={() => onDelete(_id)}
							shouldUpdateDeviceList={shouldUpdateDeviceList}
							setShouldUpdateDeviceList={setShouldUpdateDeviceList}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const AllPage = styled(AllPageContainer)`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	font-size: 16px;

	.all-page-header {
		padding-bottom: 20px;
	}
	.all-page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
