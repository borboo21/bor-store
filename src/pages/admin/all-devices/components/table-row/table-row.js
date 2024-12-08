import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border-bottom: ${({ border }) => (border ? '1px solid #ebe5e5;' : 'none')};

	& > div {
		display: flex;
		justify-content: center;
		padding: 0 10px;
	}

	& .category-column {
		display: flex;
		justify-content: flex-start;
		width: 100px;
		margin-left: 10px;
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
`;
