import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import myIcon from './logo/bor-store.png';
import styled from 'styled-components';
import { HeadLink } from './head-link/head-link';
import { cartSelector } from '../../selectors';
import { useSelector } from 'react-redux';
import { ItemsInCart } from './items-in-cart/items-in-cart';

const HeaderContainer = ({ className, ...props }) => {
	const cart = useSelector(cartSelector);
	const quantityAmount = cart.devices.reduce((sum, device) => sum + device.quantity, 0);
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
					<HeadLink to="admin" icon={faGear} />
					<HeadLink to="login" icon={faUser}>
						<span>Nikita Borisov</span>
					</HeadLink>
				</div>
				<div className="basket-control" onClick={props.onClickCart}>
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
		cursor: pointer;
		padding-left: 10px;
	}

	& .basket {
		padding: 3px 0;

		&:hover {
			color: #dfdfdf;
		}
	}

	.amount {
		font-size: small;
	}
`;
