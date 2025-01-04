import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemContainer = ({ className, ...props }) => {
	return (
		<div className={className}>
			<Link to={`/device/${props.name}`} onClick={props.onClose}>
				<span>{props.name}</span>
			</Link>
		</div>
	);
};

export const NavigationItem = styled(NavigationItemContainer)`
	font-size: 26px;
`;
