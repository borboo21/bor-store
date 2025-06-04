import { ILink } from 'interfaces/interface';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemContainer: React.FC<ILink> = ({ className, ...props }) => {
	return (
		<div className={className}>
			<Link to={`/device/${props.to}`} onClick={props.onClose}>
				<span>{props.to}</span>
			</Link>
		</div>
	);
};

export const NavigationItem = styled(NavigationItemContainer)`
	font-size: 26px;
`;
