import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalNavigationIsOpen } from '../../selectors';
import { CardButton } from '../card-button/card-button';
import { CATEGORIES } from '../../constants';
import { NavigationItem } from './navigation-item/navigation-item';
import { faX } from '@fortawesome/free-solid-svg-icons';
import type { IComponentProps } from '../../interfaces';
import { switchNavigationModal, type AppDispatch } from '../../store';
import styled from 'styled-components';

const NavigationContainer: React.FC<IComponentProps> = ({ className }) => {
	const [visible, setVisible] = useState(false);
	const navigationIsOpen = useSelector(modalNavigationIsOpen);
	const dispatch: AppDispatch = useDispatch();

	const onClose = () => {
		dispatch(switchNavigationModal());
	};

	useEffect(() => {
		if (navigationIsOpen) {
			document.body.classList.add('modal-open');
			setVisible(true);
		} else {
			document.body.classList.remove('modal-open');
			const timer = setTimeout(() => setVisible(false), 300);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [navigationIsOpen]);

	if (!visible) {
		return null;
	}

	return (
		<div className={className} onClick={onClose}>
			<div
				className={`drawer ${navigationIsOpen ? 'open' : 'close'}`}
				onClick={(e) => e.stopPropagation()}
			>
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
	opacity: 0;
	animation: fadeIn 0.3s forwards;

	.drawer {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 0;
		z-index: 2;
		min-width: 50%;
		height: 100%;
		background: #ffffff;
		box-shadow: -10px 4px 24px rgba(0, 0, 0, 0.1);
		padding: 30px;
		transform: translateX(0%);
	}

	.drawer.open {
		animation: slideInNavigation 0.3s backwards;
	}

	.drawer.close {
		animation: slideOutNavigation 0.3s backwards;
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

	@keyframes slideInNavigation {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slideOutNavigation {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 500px) {
		.drawer {
			width: 70%;
		}
	}
`;
