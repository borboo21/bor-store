import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../constants';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faPlus, faRubleSign } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const AdminPageContainer = ({ className }) => {
	const user = useSelector(userSelector);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], user.roleId)) {
			return;
		}
	}, [user.roleId]);

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<BreadCrumbs />
				<div className="admin-panel">
					<Link to={`/admin/add`}>
						<div className="add-container">
							<FontAwesomeIcon icon={faPlus} size="2xl" />
							<span>Добавить товар</span>
						</div>
					</Link>
					<Link to={`/admin/all`}>
						<div className="edit-container">
							<FontAwesomeIcon icon={faBorderAll} size="2xl" />
							<span>Редактировать товары</span>
						</div>
					</Link>
					<Link to={`/admin/orders`}>
						<div className="edit-container">
							<FontAwesomeIcon icon={faRubleSign} size="2xl" />
							<span>Список заказов</span>
						</div>
					</Link>
				</div>
			</div>
		</PrivateContent>
	);
};

export const AdminPage = styled(AdminPageContainer)`
	.admin-panel {
		display: flex;
		align-items: center;
		padding: 20px;
		width: 500px;
		height: 100%;
		justify-content: space-around;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.add-container {
		display: flex;
		flex-direction: column;
		border: 1px solid #ebe5e5;
		padding: 15px;
		border-radius: 20px;
	}

	.edit-container {
		display: flex;
		flex-direction: column;
		border: 1px solid #ebe5e5;
		padding: 15px;
		border-radius: 20px;
	}
`;
