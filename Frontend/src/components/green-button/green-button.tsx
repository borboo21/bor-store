import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import type { IGreenButton } from '../../interfaces';

const GreenButtonContainer: React.FC<IGreenButton> = ({
	children,
	className,
	onClick,
	right,
	left,
	icon,
	type,
	disabled,
	...props
}) => (
	<button
		className={className}
		onClick={onClick}
		type={type}
		disabled={disabled}
		{...props}
	>
		{left && icon && !disabled ? <FontAwesomeIcon icon={icon} /> : ''}
		<p className="btn-p">{children}</p>
		{right && icon && !disabled ? <FontAwesomeIcon icon={icon} /> : ''}
	</button>
);

export const GreenButton = styled(GreenButtonContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 55px;
	background: #9dd558;
	border-radius: 18px;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
	transition: background 0.2s ease-in-out;
	position: relative;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

	&:hover {
		background-color: ${(props) => (props.$inсart ? '#d59454e3' : '#9dd554e3')};
		svg {
			transform: ${(props) =>
				props.right ? 'translateX(5px)' : 'translateX(-5px)'};
		}

		&:active {
			background-color: #96cb55;
		}
	}
	svg {
		right: ${(props) => `${props.place}px`};
		position: absolute;
		top: 20px;
		transition: transform 0.15s ease-in-out;
	}
`;
