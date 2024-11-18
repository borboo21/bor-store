import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import myIcon from './logo/bor-store.png';
import styled from 'styled-components';

const HeaderContainer = ({ className, ...props }) => (
	<header className={className}>
		<div className="logo">
			<Link to="/">
				<img className="icon" src={myIcon} alt="icon" />
			</Link>
		</div>
		<div className="navigation">
			<Link to="/MacBook">
				<h2>MacBook</h2>
			</Link>
			<Link to="/iPhone">
				<h2>iPhone</h2>
			</Link>
			<Link to="/iPad">
				<h2>iPad</h2>
			</Link>
			<Link to="/AirPods">
				<h2>AirPods</h2>
			</Link>
			<Link to="/Watch">
				<h2>Watch</h2>
			</Link>
		</div>
		<div className="control-panel">
			<div className="icon-container">
				<Link to="/admin">
					<FontAwesomeIcon icon={faGear} size="2xl" />
				</Link>
				<Link to="/login">
					<FontAwesomeIcon icon={faUser} size="2xl" />
				</Link>
				<button className="basket" onClick={props.onClickCart}>
					<FontAwesomeIcon icon={faBasketShopping} size="2xl" />
				</button>
			</div>
		</div>
	</header>
);

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
		width: 150px;
	}

	& a {
		color: #ffff;
		padding: 0 10px 0 10px;
	}

	& .logo {
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

	& .basket {
		border: none;
		background: none;
		color: white;
		cursor: pointer;
	}
`;
