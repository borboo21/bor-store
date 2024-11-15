import { useState } from 'react';
import { BreadCrumbs, GreenButton } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faLink,
	faList,
	faRubleSign,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { addDeviceAsync } from '../../../actions';

const AddPageContainer = ({ className }) => {
	const [imageUrl, setimageUrl] = useState('');
	const [category, setCategory] = useState('');
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

	const addDevice = (category, name, imageUrl, price) => {
		addDeviceAsync(category.trim(), name, imageUrl.trim(), Number(price));
		setimageUrl('');
		setCategory('');
		setName('');
		setPrice(0);
	};

	return (
		<div className={className}>
			<div className="add-page-header">
				<BreadCrumbs lastName={'Добавление товара'} />
			</div>
			<div className="add-main">
				{isValidUrl(imageUrl) && (
					<div className="img-block">
						<div className="img-container">
							<img
								width={310}
								src={`${imageUrl}`}
								alt={'Изображение товара'}
							/>
							<span className="description">На странице товара</span>
						</div>
						<div className="img-container">
							<img
								width={140}
								height={180}
								src={`${imageUrl}`}
								alt={'Изображение на карточке товара'}
							/>
							<span className="description">На главной</span>
						</div>
						<div className="img-container">
							<img
								width={90}
								src={`${imageUrl}`}
								alt={'Изображение в корзине'}
							/>
							<span className="description">В корзине</span>
						</div>
					</div>
				)}
				<div className="input-containers">
					<div className="add-container">
						<FontAwesomeIcon icon={faLink} color="gray" />
						<input
							className="add-input"
							placeholder="Вставьте ссылку на изображение"
							type="text"
							value={imageUrl}
							onChange={({ target }) => setimageUrl(target.value)}
						/>
					</div>
					<div className="add-container">
						<FontAwesomeIcon icon={faList} color="gray" />
						<input
							className="add-input"
							placeholder="Укажите категорию товара"
							type="text"
							value={category.trim()}
							onChange={({ target }) => setCategory(target.value)}
						/>
					</div>
					<div className="add-container">
						<FontAwesomeIcon icon={faTag} color="gray" />
						<input
							className="add-input"
							placeholder="Укажите имя товара"
							type="text"
							value={name}
							onChange={({ target }) => setName(target.value)}
						/>
					</div>
					<div className="add-container">
						<FontAwesomeIcon icon={faRubleSign} color="gray" />
						<input
							className="add-input"
							placeholder="Укажите цену товара"
							type="text"
							value={price}
							onChange={({ target }) => setPrice(target.value)}
						/>
					</div>
				</div>
				<GreenButton onClick={() => addDevice(category, name, imageUrl, price)}>
					Добавить товар <FontAwesomeIcon icon={faArrowRight} />
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

	.img-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input-containers {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin-top: 20px;
	}

	.add-container {
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 15px;
		margin-bottom: 20px;
		width: 500px;
	}

	.add-input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 400px;
	}

	img {
		margin: 15px 7.5px 15px 7.5px;
	}

	button {
		width: 320px;
	}
`;
