import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceRow } from './components';
import { BreadCrumbs, PrivateContent } from '../../../components';
import {
	selectModalIsOpen,
	selectToggleUpdateDeviceList,
	selectUserRoleIdSelector,
} from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { ROLE } from '../../../constants';
import { openModal } from '../../../store/slices';
import type { IComponentProps } from '../../../interfaces';
import type { AppDispatch } from '../../../store';
import type { DeviceDTO } from '@shared/types';
import styled from 'styled-components';

const AllPageContainer: React.FC<IComponentProps> = ({ className }) => {
	const dispatch: AppDispatch = useDispatch();
	const isOpen = useSelector(selectModalIsOpen);
	const updateDeviceList = useSelector(selectToggleUpdateDeviceList);
	const [devices, setDevices] = useState<DeviceDTO[]>([]);
	const [error, setError] = useState('');

	const userRoleId = useSelector(selectUserRoleIdSelector);

	const getAllDevices = () =>
		request<DeviceDTO[]>('/api/device/all').then((deviceRes) => {
			if (deviceRes.error) {
				setError(deviceRes.error);
				return;
			}
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
	}, [isOpen, userRoleId, updateDeviceList]);

	const onDelete = (id: string) => {
		dispatch(
			openModal({
				isOpen: true,
				text: 'Удалить товар?',
				type: 'deleteDevice',
				info: id,
			}),
		);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
			<div className={className}>
				<BreadCrumbs lastName={'Все товары'} />
				<div className="all-page-main">
					{devices.map(({ category, id, name, basePrice, variants }) => (
						<DeviceRow
							key={id}
							id={id}
							category={category}
							name={name}
							basePrice={basePrice}
							variants={variants}
							onDelete={() => onDelete(id)}
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

	@media (max-width: 700px) {
		font-size: 8px;
	}
`;
