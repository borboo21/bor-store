import { ITableRow } from 'interfaces/interface';
import styled from 'styled-components';

const TableRowContainer: React.FC<ITableRow> = ({ className, children, ...props }) => (
	<div className={className} {...props}>
		{children}
	</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border-bottom: ${({ withborder }) => (withborder ? '1px solid #ebe5e5;' : 'none')};
	width: 100%;

	& > div {
		display: flex;
		justify-content: center;
		padding: 0 10px;
	}

	& .category-column {
		display: flex;
		justify-content: flex-start;
		width: 100px;
	}

	& .name-column {
		width: 160px;
		display: flex;
		justify-content: center;
	}

	& .price-column {
		display: flex;
		justify-content: center;
		width: 80px;
	}

	& .url-column {
		display: flex;
		justify-content: center;
		width: 200px;
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
