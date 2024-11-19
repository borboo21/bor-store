import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ButtonContainer = ({ className, onClick, children, icon, isactive }) => (
	<button className={className} onClick={onClick} isactive={isactive}>
		{children}
		{icon ? <FontAwesomeIcon icon={icon} /> : ''}
	</button>
);

export const Button = styled(ButtonContainer)`
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		margin: 0 10px 0 10px;
		width: 60px;
		height: 45px;
		background-color: #ffffff;
		cursor: pointer;
		background-color: ${(props) => (props.isactive ? '#ebe5e5' : '#ffffff')};

		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;

		&: hover {
			opacity: 1;
		}
		&: active {
			background-color: #ebe5e5;
		}
	}
`;
