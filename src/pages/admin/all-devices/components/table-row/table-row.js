import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000;' : 'none')};
	border-radius: 20px;

	& > div {
		display: flex;
		justify-content: center;
		padding: 0 10px;
	}

	& .category-column {
		display: flex;
		justify-content: center;
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
`;
