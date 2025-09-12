import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IButton } from '../../interfaces/interface';
import styled from 'styled-components';

const ButtonContainer: React.FC<IButton> = ({
	className,
	onClick,
	children,
	icon,
	active,
	disabled,
	width,
}) => (
	<button
		className={className}
		onClick={onClick}
		aria-pressed={active}
		disabled={disabled}
		data-width={width}
	>
		{children}
		{icon ? <FontAwesomeIcon icon={icon} /> : ''}
	</button>
);

export const Button = styled(ButtonContainer)`
	border: 1px solid #ebe5e5;
	border-radius: 10px;
	margin: 0 5px 0 5px;
	width: ${({ width }) => (width ? width : '60px')};
	height: 45px;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	background-color: ${({ active }) => (active ? '#ebe5e5' : '#ffffff')};
	opacity: 0.5;
	transition: opacity 0.2s ease-in-out;

	:hover {
		opacity: 1;
	}

	:active {
		background-color: #ebe5e5;
	}
`;
