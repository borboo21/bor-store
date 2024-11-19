import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const GreenButtonContainer = ({
	children,
	className,
	onClick,
	right,
	left,
	place,
	icon,
	inсart,
	...props
}) => (
	<button className={className} onClick={onClick} {...props}>
		{left ? <FontAwesomeIcon icon={icon} /> : ''}
		{children}
		{right ? <FontAwesomeIcon icon={icon} /> : ''}
	</button>
);

export const GreenButton = styled(GreenButtonContainer)`
	width: 100%;
	padding: 0 40px;
	height: 55px;
	background: #9dd558;
	border-radius: 18px;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
	position: relative;

	&:hover {
		background-color: ${(props) => (props.inсart ? '#d59454e3' : '#9dd554e3')};
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
