import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
	Button,
	CardItem,
	Input,
	ScrollToTopButton,
	SkeletonMain,
	SkeletonMainMobile,
} from '../../components';
import { request, debounce } from '../../utils';
import type { IComponentProps } from '../../interfaces';
import { resetDeviceData, type AppDispatch } from '../../store';
import type { DeviceDTO } from '../../../../shared';
import { resetSelectionData } from '../../store/slices';
import { useWindowSize } from '@uidotdev/usehooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDown,
	faArrowUp,
	faMagnifyingGlass,
	faRubleSign,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export const MainContainer: React.FC<IComponentProps> = ({ className }) => {
	const params = useParams();
	const windowSize = useWindowSize();
	const dispatch: AppDispatch = useDispatch();
	const [devices, setDevices] = useState<DeviceDTO[]>([]);
	const [category, setCategory] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [search, setSearch] = useState('');
	const [sortPrice, setSortPrice] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getMain = () =>
		request<{ devices: DeviceDTO[]; lastPage: number }>(
			`/api/device?search=${search}&category=${category}${sortPrice}`,
		).then(({ data: { devices } }) => {
			setDevices(devices);
			checkCategory();
			setIsLoading(false);
		});

	const checkCategory = () => {
		if (!params.device) {
			setCategory('');
		} else {
			setCategory(params.device);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getMain();
		dispatch(resetDeviceData());
		dispatch(resetSelectionData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, category, sortPrice, shouldSearch, params]);

	const startDelayedSearch = useMemo(
		() => debounce((value: boolean) => setShouldSearch(value), 2000),
		[],
	);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
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

	const renderSkeletons = () =>
		windowSize.width && windowSize.width > 600
			? Array.from({ length: 8 }, (_, i) => <SkeletonMain key={i} />)
			: Array.from({ length: 8 }, (_, i) => <SkeletonMainMobile key={i} />);

	return (
		<div className={className}>
			<div className="main-header">
				<Input
					width={250}
					height={45}
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
				{isLoading ? (
					renderSkeletons()
				) : devices.length > 0 ? (
					devices.map(({ id, category, name, basePrice, variants }) => (
						<CardItem
							key={id}
							category={category}
							name={name}
							id={id}
							basePrice={basePrice}
							loading={isLoading}
							variants={variants}
						/>
					))
				) : (
					<div className="no-device-found">
						Не найдено ни одного устройства, попробуйте снова.
					</div>
				)}
			</div>
			<ScrollToTopButton />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	min-width: 100%;
	min-height: 70vh;
	flex-direction: column;
	align-items: center;
	.card-container {
		display: grid;
		grid-template-columns: auto auto auto auto;
		@media (max-width: 1200px) {
			grid-template-columns: auto auto;
		}
	}

	.main-header {
		padding: 0 0 20px;
		display: flex;
		justify-content: center;
		@media (max-width: 600px) {
			flex-direction: column;
			align-items: center;
			gap: 10px;
		}
	}

	h5 {
		font-weight: 600;
		font-size: 18px;
	}

	b {
		font-size: 15px;
	}

	img {
		cursor: pointer;
	}

	.price-title {
		font-size: 13px;
		opacity: 0.5;
		text-transform: uppercase;
	}

	.sort-controls {
		padding-left: 40px;
		@media (max-width: 600px) {
			padding-left: 0px;
		}
	}

	.no-device-found {
		font-size: large;
		@media (max-width: 600px) {
			font-size: small;
		}
	}
`;
