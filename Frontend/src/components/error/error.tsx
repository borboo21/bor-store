import styled from 'styled-components';
import type { IError } from '../../interfaces';

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 18px;
`;

export const Error: React.FC<IError> = ({ error }) =>
	error && (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	);
