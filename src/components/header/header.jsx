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
import { cartSelector, userSelector } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ItemsInCart } from './items-in-cart/items-in-cart';
import { clearCart, logout, switchCartModal, switchNavigationModal } from '../../actions';
import myIcon from './logo/bor-store.png';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	const dispatch = useDispatch();
	const cart = useSelector(cartSelector);
	const user = useSelector(userSelector);
	const quantityAmount = cart.devices.reduce((sum, device) => sum + device.quantity, 0);

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
				<HeadLink to="MacBook">
					<h2>MacBook</h2>
				</HeadLink>
				<HeadLink to="iPhone">
					<h2>iPhone</h2>
				</HeadLink>
				<HeadLink to="iPad">
					<h2>iPad</h2>
				</HeadLink>
				<HeadLink to="AirPods">
					<h2>AirPods</h2>
				</HeadLink>
				<HeadLink to="Watch">
					<h2>Watch</h2>
				</HeadLink>
			</div>
			<div className="control-panel">
				<div className="icon-container">
					{user.roleId === 0 ? (
						<HeadLink to="admin" icon={faGear} size="lg" />
					) : (
						''
					)}
					{user.login ? (
						<div className="user" onClick={onLogout}>
							<div className="exit">
								<FontAwesomeIcon icon={faUser} size="lg" />
								<FontAwesomeIcon icon={faXmark} size="xs" />
							</div>

							<span className="user-name">{user.login}</span>
						</div>
					) : (
						<HeadLink to="login" icon={faUser} size="xl" />
					)}
				</div>
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
	}

	& .navigation-button {
		display: none;
	}

	& .control-panel {
		display: flex;
		align-items: center;
	}
	& .icon {
		width: 180px;
	}

	.icon-container {
		display: flex;
	}

	& .basket-control {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-left: 10px;
	}

	& .basket {
		cursor: pointer;
		padding: 3px 0;

		&:hover {
			color: #dfdfdf;
		}
	}

	.user {
		display: flex;
		flex-direction: column;
		position: relative;
		cursor: pointer;
		padding: 0 10px;

		&:hover {
			color: #dfdfdf;
		}
	}

	.exit {
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.amount {
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
		.icon {
			width: 140px;
		}
		.control-panel {
			width: 100px;
			justify-content: center;
		}
		.item-counter {
			width: 18px;
			height: 17px;
			font-size: 12px;
			left: 25px;
			top: -12px;
		}
		.user {
			padding: 0px;
		}
		.user-name {
			font-size: 11px;
		}
	}
`;
