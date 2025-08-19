import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import type { ILink } from '../../../interfaces';
import styled from 'styled-components';

const LinkContainer: React.FC<ILink> = ({ className, to, children, icon, size }) => (
	<div className={className}>
		{icon ? (
			<>
				<Link to={`/${to}`}>
					<FontAwesomeIcon icon={icon} size={size} />
					{children}
				</Link>
			</>
		) : (
			<h2>
				<Link to={`/device/${to}`}>{to}</Link>
			</h2>
		)}
	</div>
);

export const HeadLink = styled(LinkContainer)`
	padding: 0 10px;
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
		cursor: pointer;
		&:hover {
			color: #dfdfdf;
		}
	}
`;
