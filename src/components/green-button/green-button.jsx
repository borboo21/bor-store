import styled from 'styled-components';

const GreenButtonContainer = ({ children, className, onClick, ...props }) => (
	<button className={className} onClick={onClick} {...props}>
		{children}
	</button>
);

export const GreenButton = styled(GreenButtonContainer)`
	width: 100%;
	height: 55px;
	background: #9dd558;
	border-radius: 18px;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background-color: #9dd554e3;
	}
	&:active {
		background-color: #96cb55;
	}
}
`;
