import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import { clearCart, logout, switchCartModal } from '../../actions';
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

	return (
		<header className={className}>
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
					{user.roleId === 0 ? <HeadLink to="admin" icon={faGear} /> : ''}
					{user.login ? (
						<div className="user" onClick={onLogout} icon={faUser}>
							<div className="exit">
								<FontAwesomeIcon icon={faUser} size="xl" />
								<FontAwesomeIcon icon={faXmark} size="xs" />
							</div>

							<span className="user-name">{user.login}</span>
						</div>
					) : (
						<HeadLink to="login" icon={faUser} />
					)}
				</div>
				<div className="basket-control" onClick={onOpenCart}>
					<FontAwesomeIcon
						className="basket"
						icon={faBasketShopping}
						size={'2xl'}
					/>
					<ItemsInCart quantity={quantityAmount} />
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
`;
