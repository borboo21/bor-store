import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDown,
	faArrowUp,
	faMagnifyingGlass,
	faRubleSign,
} from '@fortawesome/free-solid-svg-icons';
import { CardItem } from '../../components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const MainContainer = ({ className }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('https://6720f7f998bbb4d93ca6e474.mockapi.io/iphone')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setItems(json);
			});
	}, []);

	return (
		<div className={className}>
			<div className="main-header">
				<div className="search-bar">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<input className="search-input" placeholder="Поиск..." type="text" />
				</div>
				<div className="sort-controls">
					<button className="price-button">
						<FontAwesomeIcon icon={faRubleSign} />
						<FontAwesomeIcon icon={faArrowUp} />
					</button>
					<button className="price-button">
						<FontAwesomeIcon icon={faRubleSign} />
						<FontAwesomeIcon icon={faArrowDown} />
					</button>
				</div>
			</div>
			<div className="card-container">
				{items.map((item) => (
					<CardItem
						name={item.name}
						price={item.price}
						img={item.img}
						id={item.id}
						onPlus={item.onPlus}
					/>
				))}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	.card-container {
		display: flex;
		flex-wrap: wrap;
	}

	.main-header {
		padding: 0 0 20px;
		display: flex;
		justify-content: center;
	}

	.search-bar {
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 15px;
	}

	.search-input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 200px;
	}

	h5 {
		font-weight: 600;
		font-size: 16px;
	}

	span {
		font-size: 13px;
		opacity: 0.5;
		text-transform: uppercase;
	}

	b {
		font-size: 15px;
	}

	img {
		cursor: pointer;
	}

	.sort-controls {
		padding-left: 40px;
	}

	.price-button {
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		margin: 0 10px 0 10px;
		width: 60px;
		height: 45px;
		background-color: #ffffff;
		cursor: pointer;

		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;

		&: hover {
			opacity: 1;
		}
		&: active {
			background-color: #ebe5e5;
		}
	}
`;
