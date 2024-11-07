import styled from 'styled-components';
import { BreadCrumbs } from '../../../components';
import { faBorderAll, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const AdminPageContainer = ({ className }) => {
	return (
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
			</div>
		</div>
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
