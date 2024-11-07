import styled from 'styled-components';
import { BreadCrumbs } from '../../../components';
import { DeviceRow, TableRow } from './components';

const AllPageContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="all-page-header">
				<BreadCrumbs lastName={'Все товары'} />
			</div>
			<div className="all-page-main">
				<TableRow>
					<div className="category-column">Категория</div>
					<div className="name-column">Название</div>
					<div className="price-column">Цена</div>
					<div className="url-column">Ссылка на картинку</div>
				</TableRow>
				<DeviceRow />
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
