import styled from 'styled-components';

const FooterContainer = ({ className }) => (
	<footer className={className}>
		<h1>footer</h1>
	</footer>
);

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 120px;
	box-shadow: 0px 2px 17px #000;
	background-color: #2b2f32;
	color: #ffff;
	font-weight: bold;
`;
