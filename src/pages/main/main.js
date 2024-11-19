import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDown,
	faArrowUp,
	faMagnifyingGlass,
	faRubleSign,
} from '@fortawesome/free-solid-svg-icons';
import { Button, CardItem, Input, Pagination } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import { PAGINATION_LIMIT, URL } from '../../constants';
import { useDispatch } from 'react-redux';
import { loadCartAsync } from '../../actions/load-cart-async';
import { request } from '../../utils/request';
import { debounce } from '../../utils';
import styled from 'styled-components';
import { useParams } from 'react-router';

export const MainContainer = ({ className }) => {
	const [devices, setDevices] = useState([]);
	const [category, setCategory] = useState('');
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState('');
	const [search, setSearch] = useState('');
	const [lastPage, setLastPage] = useState(1);
	const [sortPrice, setSortPrice] = useState('');
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		const getByCategory = () =>
			request(
				`${URL}/device?name=${search}&category=${category}&_page=${page}&_per_page=${PAGINATION_LIMIT}${sortPrice}`,
			).then(({ data: devices, last }) => {
				dispatch(loadCartAsync());
				setDevices(devices);
				setLastPage(last);
			});
		const getMain = () =>
			request(
				`${URL}/device?name=${search}&_page=${page}&_per_page=${PAGINATION_LIMIT}${sortPrice}`,
			).then(({ data: devices, last }) => {
				dispatch(loadCartAsync());
				setDevices(devices);
				setLastPage(last);
			});
		setCategory(params.device);
		params.device ? getByCategory() : getMain();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, category, page, sortPrice, shouldSearch, params]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearch(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const onSortAsc = () => {
		if (sortPrice === '&_sort=price') {
			setSortPrice('');
		} else {
			setSortPrice('&_sort=price');
		}
	};

	const onSortDesc = () => {
		if (sortPrice === '&_sort=price&_order=desc') {
			setSortPrice('');
		} else {
			setSortPrice('&_sort=price&_order=desc');
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
						isactive={sortPrice === '&_sort=price'}
					>
						<FontAwesomeIcon icon={faArrowUp} />
					</Button>
					<Button
						onClick={onSortDesc}
						icon={faRubleSign}
						isactive={sortPrice === '&_sort=price&_order=desc'}
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
							key={item.id}
							category={item.category}
							name={item.name}
							price={item.price}
							imageUrl={item.imageUrl}
							id={item.id}
							onPlus={item.onPlus}
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
