import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs, PrivateContent } from '../../../components';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUserRoleIdSelector } from '../../../selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faPlus, faRubleSign } from '@fortawesome/free-solid-svg-icons';
import type { IComponentProps } from '../../../interfaces/interface';
import styled from 'styled-components';

const AdminPageContainer: React.FC<IComponentProps> = ({ className }) => {
	const userRole = useSelector(selectUserRoleIdSelector);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
	}, [userRole]);

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<BreadCrumbs />
				<div className="admin-panel">
					<Link to={`/admin/add`}>
						<div className="container">
							<FontAwesomeIcon icon={faPlus} size="2xl" />
							<span>Добавить товар</span>
						</div>
					</Link>
					<Link to={`/admin/all`}>
						<div className="container">
							<FontAwesomeIcon icon={faBorderAll} size="2xl" />
							<span>Редактировать товары</span>
						</div>
					</Link>
					<Link to={`/admin/orders`}>
						<div className="container">
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
		height: 100%;
		justify-content: space-around;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.container {
		display: flex;
		flex-direction: column;
		border: 1px solid #ebe5e5;
		padding: 15px;
		margin: 0 5px 0 5px;
		border-radius: 20px;
	}
`;
