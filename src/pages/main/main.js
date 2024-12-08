import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Button, CardItem, Input, Pagination } from '../../components';
import { request, debounce } from '../../utils';
import { PAGINATION_LIMIT } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDown,
	faArrowUp,
	faMagnifyingGlass,
	faRubleSign,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export const MainContainer = ({ className }) => {
	const params = useParams();
	const [devices, setDevices] = useState([]);
	const [category, setCategory] = useState('');
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState('');
	const [search, setSearch] = useState('');
	const [lastPage, setLastPage] = useState(1);
	const [sortPrice, setSortPrice] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const getMain = () =>
		request(
			`/device?search=${search}&category=${category}&page=${page}&limit=${PAGINATION_LIMIT}${sortPrice}`,
		).then(({ data: { devices, lastPage } }) => {
			setDevices(devices);
			setLastPage(lastPage);
			checkCategory();
			setIsLoading(false);
		});

	const checkCategory = () => {
		const prevCategory = category;
		if (prevCategory !== params.device) {
			setPage(1);
		}
		if (!params.device) {
			console.log(params.device);
			setPage(page);
			setCategory('');
		} else {
			setCategory(params.device);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getMain();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, category, page, sortPrice, shouldSearch, params]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearch(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const onSortAsc = () => {
		if (sortPrice === '&sorting=1') {
			setSortPrice('');
		} else {
			setSortPrice('&sorting=1');
		}
	};

	const onSortDesc = () => {
		if (sortPrice === '&sorting=-1') {
			setSortPrice('');
		} else {
			setSortPrice('&sorting=-1');
		}
	};

	return (
		<div className={className}>
			<div className="main-header">
				<Input
					width={250}
					value={search}
					onChange={onSearch}
					placeholder={'Поиск'}
					icon={faMagnifyingGlass}
				/>
				<div className="sort-controls">
					<Button
						onClick={onSortAsc}
						icon={faRubleSign}
						active={sortPrice === '&sorting=1'}
					>
						<FontAwesomeIcon icon={faArrowUp} />
					</Button>
					<Button
						onClick={onSortDesc}
						icon={faRubleSign}
						active={sortPrice === '&sorting=-1'}
					>
						<FontAwesomeIcon icon={faArrowDown} />
					</Button>
				</div>
			</div>
			<div className="card-container">
				{devices.length > 0 ? (
					devices.map((item) => (
						<CardItem
							dispatch={dispatch}
							key={item._id}
							category={item.category}
							name={item.name}
							price={item.price}
							imageUrl={item.imageUrl}
							id={item._id}
							onPlus={item.onPlus}
							loading={isLoading}
							setIsLoading={setIsLoading}
						/>
					))
				) : (
					<div className="no-device-found">
						Не найдено ни одного устройства, попробуйте снова.
					</div>
				)}
			</div>
			{devices.length ? (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			) : (
				''
			)}
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

	.no-device-found {
		font-size: large;
	}
`;
