import styled from 'styled-components';

const FooterContainer = ({ className }) => (
	<footer className={className}>
		<div className="information-footer">
			<div>
				<h2>БорСтор™</h2>
			</div>
			<div className="creator">
				<span>Создание сайта:</span>
				<a className="link" href="https://t.me/borboo">
					bor_boo
				</a>
			</div>
		</div>
	</footer>
);

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 84px;
	box-shadow: 0px 2px 17px #000;
	background-color: #2b2f32;
	color: #ffff;
	font-weight: bold;

	.link {
		color: white;
		&:hover {
			color: #dfdfdf;
		}
	}

	.information-footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	.creator {
		display: flex;
		flex-direction: column;
	}
`;
