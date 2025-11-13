import styled from 'styled-components';
import type { ITableRow } from '../../../../../interfaces';

const TableRowContainer: React.FC<ITableRow> = ({ className, children, ...props }) => (
	<div className={className} {...props}>
		{children}
	</div>
);

export const TableRow = styled(TableRowContainer)`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-content: center;
	justify-items: center;
	border-bottom: ${({ $withBorder }) => ($withBorder ? '1px solid #ebe5e5;' : 'none')};
	width: 100%;
	min-height: 60px;
	gap: 10px;
	cursor: ${({ $isEdit }) => ($isEdit ? 'auto' : 'pointer')};
`;
