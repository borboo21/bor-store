import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars,
	faBasketShopping,
	faGear,
	faUser,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { HeadLink } from './head-link/head-link';
import {
	cartItemsSelector,
	userLoginSelector,
	selectUserRoleIdSelector,
} from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ItemsInCart } from './items-in-cart/items-in-cart';
import myIcon from './logo/bor-store.png';
import styled from 'styled-components';
import {
	clearCart,
	logout,
	switchCartModal,
	switchNavigationModal,
	type AppDispatch,
} from '../../store';
import type { IComponentProps } from '../../interfaces';
import { CATEGORIES } from '../../constants';

const HeaderContainer: React.FC<IComponentProps> = ({ className }) => {
	const dispatch: AppDispatch = useDispatch();
	const cartDevices = useSelector(cartItemsSelector);
	const userLogin = useSelector(userLoginSelector);
	const userRoleId = useSelector(selectUserRoleIdSelector);
	const quantityAmount = cartDevices.reduce((sum, device) => sum + device.quantity, 0);

	const onLogout = () => {
		dispatch(logout());
		dispatch(clearCart());
		sessionStorage.removeItem('userData');
	};

	const onOpenCart = () => {
		dispatch(switchCartModal());
	};

	const onOpenNavigation = () => {
		dispatch(switchNavigationModal());
	};

	return (
		<header className={className}>
			<div className="navigation-button">
				<FontAwesomeIcon
					className="navigation-bars"
					icon={faBars}
					size="xl"
					onClick={onOpenNavigation}
				/>
			</div>
			<div className="logo">
				<Link to="/">
					<img className="icon" src={myIcon} alt="icon" />
				</Link>
			</div>
			<div className="navigation">
				{CATEGORIES.map((item: string, index: number) => (
					<HeadLink to={item} key={index} />
				))}
			</div>
			<div className="control-panel">
				{userRoleId === 0 ? (
					<HeadLink className="admin-link" to="admin" icon={faGear} size="lg" />
				) : (
					''
				)}
				{userLogin ? (
					<div className="user" onClick={onLogout}>
						<div className="exit">
							<FontAwesomeIcon
								className="user-logo"
								icon={faUser}
								size="lg"
							/>
							<FontAwesomeIcon
								className="x-mark"
								icon={faXmark}
								size="2xs"
							/>
						</div>
						<span className="user-name">{userLogin}</span>
					</div>
				) : (
					<HeadLink to="login" icon={faUser} size="xl" />
				)}

				<div className="basket-control">
					<FontAwesomeIcon
						onClick={onOpenCart}
						className="basket"
						icon={faBasketShopping}
						size={'xl'}
					/>
					<ItemsInCart className="item-counter" quantity={quantityAmount} />
				</div>
			</div>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-evenly;
	position: fixed;
	top: 0;
	width: 100%;
	height: 84px;
	box-shadow: 0px -2px 17px #000;
	background-color: #2b2f32;
	color: #ffff;
	z-index: 1;

	.logo {
		display: flex;
		align-items: center;
	}

	& .navigation {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	& .navigation-button {
		display: none;
	}

	& .control-panel {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	& .icon {
		max-width: 140px;
	}

	& .control-panel {
		min-width: 120px;
	}

	.icon-container {
		display: flex;
	}

	& .basket-control {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	& .basket {
		cursor: pointer;

		&:hover {
			color: #dfdfdf;
		}
	}

	& .user {
		position: relative;
		cursor: pointer;

		& .x-mark {
			position: absolute;
			left: 25px;
			top: -2px;
		}

		&:hover {
			color: #dfdfdf;
		}
	}

	& .exit {
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	& .amount {
		font-size: small;
	}

	@media (max-width: 900px) {
		.navigation {
			display: none;
		}
		.navigation-button {
			display: flex;
			align-items: center;
			width: 100px;
			justify-content: center;
		}
		.navigation-bars {
			cursor: pointer;
			&:hover {
				color: #dfdfdf;
			}
		}
	}

	@media (max-width: 600px) {
		.control-panel {
			min-width: 110px;
			justify-content: center;
		}
		.item-counter {
			width: 18px;
			height: 17px;
			font-size: 12px;
			left: 25px;
			top: -12px;
		}

		& .x-mark {
			left: 17px;
		}

		& .logo {
			min-width: 110px;
		}
		.user-name {
			display: flex;
			justify-content: center;
			font-size: 14px;
		}
	}

	@media (max-width: 400px) {
		& .icon {
			width: 110px;
		}
		& .control-panel {
			gap: 5px;
		}
	}
`;
