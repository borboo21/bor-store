import { TableRow } from '../table-row/table-row';
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { request } from '../../../../../utils/request';
import { CATEGORIES } from '../../../../../constants';
import { Button } from '../../../../../components';
import styled from 'styled-components';

const DeviceRowContainer = ({ className, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [category, setCategory] = useState(props.category);
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);
	const [newURL, setNewURL] = useState(props.imageUrl);

	const symbolLengthBlock = (string) => {
		if (string.length >= 17) {
			return string.substring(0, 17) + '...';
		}
	};

	const handleEditClick = () => {
		setIsEdit((prev) => !prev);
	};

	const onCategoryChange = ({ target }) => {
		setCategory(target.value);
	};

	const onSave = (id, newName, newPrice, newURL) => {
		request(`/device/${id}`, 'PATCH', {
			category: category,
			name: newName,
			price: newPrice,
			imageUrl: newURL,
		}).then(() => {
			props.setShouldUpdateDeviceList(!props.shouldUpdateDeviceList);
			setIsEdit((prev) => !prev);
		});
	};

	return (
		<div className={className}>
			{isEdit ? (
				<TableRow border={true}>
					<div className="category-column">
						<select
							className="edit-input"
							value={category}
							onChange={onCategoryChange}
						>
							{CATEGORIES.map((categoryName, index) => (
								<option key={index} value={categoryName}>
									{categoryName}
								</option>
							))}
						</select>
					</div>
					<div className="name-column">
						<input
							className="edit-input"
							onChange={({ target }) => setNewName(target.value)}
							value={newName}
						/>
					</div>
					<div className="price-column">
						<input
							className="edit-input"
							onChange={({ target }) => setNewPrice(target.value)}
							value={newPrice}
						/>
					</div>
					<div className="url-column">
						<input
							className="edit-input"
							onChange={({ target }) => setNewURL(target.value)}
							value={newURL}
						/>
					</div>
					<Button
						onClick={() =>
							onSave(props.id, newName, Number(newPrice), newURL)
						}
					>
						<FontAwesomeIcon icon={faFloppyDisk} size="xl" />
					</Button>
				</TableRow>
			) : (
				<TableRow border={true}>
					<div className="category-column">{props.category}</div>
					<div className="name-column">{props.name}</div>
					<div className="price-column">{props.price}</div>
					<div className="url-column">{symbolLengthBlock(props.imageUrl)}</div>
					<Button onClick={handleEditClick} edit={true}>
						<FontAwesomeIcon icon={faPen} size="xl" />
					</Button>
					<Button onClick={props.onDelete} del={true}>
						<FontAwesomeIcon icon={faTrash} size="xl" />
					</Button>
				</TableRow>
			)}
			<div className="controls"></div>
		</div>
	);
};

export const DeviceRow = styled(DeviceRowContainer)`
	display: flex;
	margin-top: 10px;
	font-size: 14px;
	width: 550px;

	button {
		margin-bottom: 5px;
	}

	.edit-input {
		width: -webkit-fill-available;
		border-radius: 20px;
		border: 1px solid gray;
		height: 30px;
		padding: 0 5px;
	}

	svg {
		padding-bottom: 10px;
		cursor: pointer;
	}
`;
