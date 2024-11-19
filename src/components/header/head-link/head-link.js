import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkContainer = ({ className, to, children, icon, size }) => (
	<div className={className}>
		{icon ? (
			<>
				<Link to={`/${to}`}>
					<FontAwesomeIcon icon={icon} size={children ? 'xl' : '2xl'} />
					{children}
				</Link>
			</>
		) : (
			<Link to={`/${to}`}>{children}</Link>
		)}
	</div>
);

export const HeadLink = styled(LinkContainer)`
	padding: 0 10px;
	cursor: pointer;
	display: flex;
	align-items: center;

	span {
		font-size: small;
	}

	& a {
		display: flex;
		align-items: center;
		color: #ffff;
		flex-direction: column;

		&:hover {
			color: #dfdfdf;
		}
	}
`;
