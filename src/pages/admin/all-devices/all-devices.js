import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceRow, TableRow } from './components';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { selectModalIsOpen, userSelector } from '../../../selectors';
import { checkAccess, request } from '../../../utils';
import { ROLE } from '../../../constants';
import { CLOSE_MODAL, openModal } from '../../../actions';
import styled from 'styled-components';

const AllPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isOpen = useSelector(selectModalIsOpen);
	const [device, setDevice] = useState([]);
	const [error, setError] = useState(null);
	const [shouldUpdateDeviceList, setShouldUpdateDeviceList] = useState(false);

	const user = useSelector(userSelector);

	const getAll = () =>
		request('/device/all').then((deviceRes) => {
			if (deviceRes.error) {
				setError(deviceRes.error);
				return;
			}
			setDevice(deviceRes.data);
		});

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}

		getAll();

		if (isOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [isOpen, user.roleId, shouldUpdateDeviceList]);

	const onDelete = (deviceId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirm: () => {
					request(`/device/${deviceId}`, 'DELETE').then(() => {
						setShouldUpdateDeviceList(!shouldUpdateDeviceList);
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} error={error}>
			<div className={className}>
				<BreadCrumbs lastName={'Все товары'} />
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
