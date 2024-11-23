import { useState } from 'react';
import { BreadCrumbs, GreenButton, Input } from '../../../components';
import {
	faArrowRight,
	faLink,
	faList,
	faRubleSign,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { addDeviceAsync } from '../../../actions';
import { Image } from './components';
import { CATEGORIES } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPageContainer = ({ className }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [category, setCategory] = useState('iPhone');
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const onCategoryChange = ({ target }) => {
		setCategory(target.value);
	};

	const addDevice = (category, name, imageUrl, price) => {
		addDeviceAsync(category, name, imageUrl.trim(), Number(price));
		setImageUrl('');
		setCategory('');
		setName('');
		setPrice(0);
	};

	return (
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
						width={400}
						value={imageUrl}
						setValue={setImageUrl}
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
						width={400}
						value={name}
						setValue={setName}
						icon={faTag}
						placeholder={'Укажите имя товара'}
					/>
					<Input
						width={400}
						value={price}
						setValue={setPrice}
						icon={faRubleSign}
						placeholder={'Укажите цену товара'}
					/>
				</div>
				<GreenButton
					onClick={() => addDevice(category, name, imageUrl, price)}
					right={true}
					place={20}
					icon={faArrowRight}
				>
					Добавить товар
				</GreenButton>
			</div>
		</div>
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
		width: 400px;
	}

	select {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 300px;
	}

	button {
		width: 320px;
	}
`;
