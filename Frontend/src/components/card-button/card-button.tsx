import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICardButton } from 'interfaces/interface';
import styled from 'styled-components';

const CardButtonContainer: React.FC<ICardButton> = ({
	className,
	onClick,
	icon,
	color,
	isLoading,
	...props
}) => (
	<button className={className} onClick={onClick} {...props}>
		{icon ? <FontAwesomeIcon icon={icon} /> : <></>}
	</button>
);

export const CardButton = styled(CardButtonContainer)`
	background-color: ${({ color = '#ffffff;' }) => color};
	border: 1px solid #f2f2f2;
	box-sizing: border-box;
	border-radius: 8px;
	height: 32px;
	width: 32px;
	margin: ${({ margin = '0' }) => margin};
	cursor: pointer;
	color: gray;
	opacity: 0.5;
	transition: opacity 0.2s ease-in-out;

	&:hover {
		opacity: 1;
	}
`;
