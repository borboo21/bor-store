import { useEffect, useState } from 'react';
import {
	BreadCrumbs,
	GreenButton,
	Input,
	Loader,
	PrivateContent,
} from '../../../components';
import {
	faArrowRight,
	faLink,
	faList,
	faRubleSign,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import { addDeviceAsync } from '../../../actions';
import { Image } from './components';
import { CATEGORIES, ROLE } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkAccess } from '../../../utils';
import { useSelector } from 'react-redux';
import { selectUserRoleIdSelector } from '../../../selectors';
import styled from 'styled-components';
import { IComponentProps } from 'interfaces/interface';

const AddPageContainer: React.FC<IComponentProps> = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const [category, setCategory] = useState('iPhone');
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const userRole = useSelector(selectUserRoleIdSelector);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
	}, [userRole]);

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};
	const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(e.target.value));
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(String(e.target.value));
	};

	const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(String(e.target.value));
	};

	const addDevice = (
		category: string,
		name: string,
		imageUrl: string,
		price: number,
	) => {
		addDeviceAsync(category, name, imageUrl.trim(), price, setIsLoading);
		setImageUrl('');
		setCategory('iPhone');
		setName('');
		setPrice(0);
	};

	const isButtonDisabled = !isValidUrl(imageUrl) || !Boolean(name) || !Number(price);

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<BreadCrumbs lastName={'Добавление товара'} />
				<div className="add-main">
					{isValidUrl(imageUrl) && (
						<div className="img-block">
							<Image
								width={310}
								imageUrl={imageUrl}
								alt={'На странице товара'}
								description={'На странице товара'}
							/>
							<Image
								width={170}
								imageUrl={imageUrl}
								alt={'На главной'}
								description={'На главной'}
							/>
							<Image
								width={90}
								imageUrl={imageUrl}
								alt={'Изображение в корзине'}
								description={'В корзине'}
							/>
						</div>
					)}
					<div className="input-containers">
						<Input
							width={350}
							value={imageUrl}
							onChange={onImageChange}
							icon={faLink}
							placeholder={'Вставьте ссылку на изображение'}
						/>
						<div className="select-div">
							<FontAwesomeIcon color="gray" icon={faList} />
							<select value={category} onChange={onCategoryChange}>
								{CATEGORIES.map((categoryName, index) => (
									<option key={index} value={categoryName}>
										{categoryName}
									</option>
								))}
							</select>
						</div>
						<Input
							width={350}
							value={name}
							onChange={onNameChange}
							icon={faTag}
							placeholder={'Укажите имя товара'}
						/>
						<Input
							width={350}
							value={price}
							onChange={onPriceChange}
							icon={faRubleSign}
							placeholder={'Укажите цену товара'}
						/>
					</div>
					{isLoading ? (
						<Loader />
					) : (
						<GreenButton
							onClick={() => addDevice(category, name, imageUrl, price)}
							right={true}
							place={20}
							icon={faArrowRight}
							disabled={isButtonDisabled}
						>
							Добавить товар
						</GreenButton>
					)}
				</div>
			</div>
		</PrivateContent>
	);
};

export const AddPage = styled(AddPageContainer)`
	.add-main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.img-block {
		display: flex;
		align-items: flex-end;
	}

	.input-containers {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin-top: 20px;
	}

	.select-div {
		display: flex;
		align-items: center;
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 15px;
		margin-bottom: 20px;
		width: 350px;
	}

	select {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 300px;
		cursor: pointer;
		background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
			no-repeat 95% 50%;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
	}

	button {
		width: 320px;
	}
`;
