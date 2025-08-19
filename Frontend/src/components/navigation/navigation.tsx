import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway } from '@uidotdev/usehooks';
import { modalNavigationIsOpen } from '../../selectors';
import { CardButton } from '../card-button/card-button';
import { CATEGORIES } from '../../constants';
import { NavigationItem } from './navigation-item/navigation-item';
import { switchNavigationModal } from 'store/slices';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { IComponentProps } from 'interfaces/interface';
import { AppDispatch } from 'store/store';

const NavigationContainer: React.FC<IComponentProps> = ({ className }) => {
	const navigationIsOpen = useSelector(modalNavigationIsOpen);
	const dispatch: AppDispatch = useDispatch();

	const onClose = () => {
		dispatch(switchNavigationModal());
	};

	const ref = useClickAway<HTMLDivElement>(onClose);

	useEffect(() => {
		if (navigationIsOpen) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [navigationIsOpen]);

	if (!navigationIsOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="drawer" ref={ref}>
				<div className="navigation-header">
					<h2 className="navigation-name">Навигация</h2>
					<CardButton onClick={onClose} icon={faX} />
				</div>
				<div className="navigation">
					{CATEGORIES.map((item, index) => (
						<NavigationItem to={item} key={index} onClose={onClose} />
					))}
				</div>
			</div>
		</div>
	);
};

export const Navigation = styled(NavigationContainer)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
	overflow: hidden;

	.drawer {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		width: 50%;
		height: 100%;
		background: #ffffff;
		box-shadow: -10px 4px 24px rgba(0, 0, 0, 0.1);
		padding: 30px;
	}

	.navigation-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navigation {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		height: 40%;
	}

	@media (max-width: 500px) {
		.drawer {
			width: 70%;
		}
	}
`;
