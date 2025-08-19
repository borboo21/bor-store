import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { IBreadCrumb } from '../../interfaces/interface';

const BreadCrumbsContainer: React.FC<IBreadCrumb> = ({ className, lastName }) => {
	const location = useLocation();
	const pathNames = location.pathname.split('/').filter((name) => name);
	if (lastName) {
		pathNames[pathNames.length - 1] = lastName;
	}

	return (
		<div className={className}>
			<nav aria-label="breadcrumb">
				<span className="breadcrumb-span">
					<Link className="breadcrumb-item" to={'/'}>
						Главная
					</Link>
				</span>
				{pathNames.map((value, index) => {
					if (value !== 'device') {
						const to = `/${pathNames.slice(0, index + 1).join('/')}`;
						const lastKeyIndex = pathNames.length - 1;
						return (
							<span key={index}>
								<span className="breadcrumb-separator">/</span>
								<Link key={index} to={index === lastKeyIndex ? '' : to}>
									<span className="breadcrumb-item">{value}</span>
								</Link>
							</span>
						);
					} else {
						return null;
					}
				})}
			</nav>
		</div>
	);
};

export const BreadCrumbs = styled(BreadCrumbsContainer)`
	padding: 0 0 20px 20px;

	.breadcrumb-item {
		color: #9a9a9a;
		font-size: 12px;
		font-weight: 400;

		&:hover {
			text-decoration: underline;
		}
	}

	.breadcrumb-separator {
		color: #9a9a9a;
		padding: 0 10px 0 10px;
		font-size: 12px;
		font-weight: 400;
	}
`;
