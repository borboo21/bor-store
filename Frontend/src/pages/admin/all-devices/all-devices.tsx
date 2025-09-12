import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceRow, TableRow } from './components';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { selectModalIsOpen, selectUserRoleIdSelector } from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { ROLE } from '../../../constants';
import { openModal } from '../../../store/slices';
import type { IComponentProps } from '../../../interfaces';
import type { AppDispatch } from '../../../store';
import styled from 'styled-components';
import type { DeviceDTO } from '../../../../../shared';

const AllPageContainer: React.FC<IComponentProps> = ({ className }) => {
	const dispatch: AppDispatch = useDispatch();
	const isOpen = useSelector(selectModalIsOpen);
	const [devices, setDevices] = useState<DeviceDTO[]>([]);
	const [error, setError] = useState('');
	const [shouldUpdateDeviceList, setShouldUpdateDeviceList] = useState(false);

	const userRoleId = useSelector(selectUserRoleIdSelector);

	const getAllDevices = () =>
		request<DeviceDTO[]>('/api/device/all').then((deviceRes) => {
			if (deviceRes.error) {
				setError(deviceRes.error);
				return;
			}
			console.log(deviceRes);
			setDevices(deviceRes.data);
		});

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRoleId)) {
			return;
		}

		getAllDevices();

		if (isOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [isOpen, userRoleId, shouldUpdateDeviceList]);

	const onDelete = (id: string) => {
		dispatch(
			openModal({
				isOpen: true,
				text: 'Удалить товар?',
				type: 'deleteDevice',
				info: id,
			}),
		);
		setShouldUpdateDeviceList(!shouldUpdateDeviceList);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
			<div className={className}>
				<BreadCrumbs lastName={'Все товары'} />
				<div className="all-page-main">
					<TableRow>
						<div className="category-column">Категория</div>
						<div className="name-column">Название</div>
						<div className="price-column">Цена</div>
						<div className="url-column">Ссылка</div>
					</TableRow>
					{devices.map(({ category, id, imageUrl, name, price }) => (
						<DeviceRow
							key={id}
							id={id}
							category={category}
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
		</PrivateContent>
	);
};

export const AllPage = styled(AllPageContainer)`
	display: flex;
	flex-direction: column;
	font-size: 15px;

	.all-page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	@media (max-width: 830px) {
		font-size: 10px;

		.category-column {
			width: 50px;
		}
		.name-column {
			width: 130px;
		}
		.price-column {
			width: 40px;
		}
		.url-column {
			width: 130px;
		}
	}

	@media (max-width: 430px) {
		font-size: 8px;

		.category-column {
			width: 40px;
		}
		.name-column {
			width: 110px;
		}
		.price-column {
			width: 25px;
		}
		.url-column {
			width: 110px;
		}
	}
`;
