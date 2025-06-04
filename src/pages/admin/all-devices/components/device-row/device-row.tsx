import { TableRow } from '../table-row/table-row';
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { request } from '../../../../../utils/request';
import { CATEGORIES } from '../../../../../constants';
import { Button } from '../../../../../components';
import { IDeviceRow } from 'interfaces/interface';
import styled from 'styled-components';

const DeviceRowContainer: React.FC<IDeviceRow> = ({ className, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [category, setCategory] = useState(props.category);
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);
	const [newURL, setNewURL] = useState(props.imageUrl);

	const symbolLengthBlock = (string: string) => {
		if (string.length >= 17) {
			return string.substring(0, 17) + '...';
		} else {
			return string;
		}
	};

	const handleEditClick = () => {
		setIsEdit((prev) => !prev);
	};

	const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
	};

	const onSave = (id: string, newName: string, newPrice: number, newURL: string) => {
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
				<TableRow withborder={'true'}>
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
							onChange={({ target }) => setNewPrice(Number(target.value))}
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
				<TableRow withborder={'true'}>
					<div className="category-column">{props.category}</div>
					<div className="name-column">{props.name}</div>
					<div className="price-column">{props.price}</div>
					<div className="url-column">{symbolLengthBlock(props.imageUrl)}</div>
					<Button className="all-device-button" onClick={handleEditClick}>
						<FontAwesomeIcon icon={faPen} className="pen" size="xl" />
					</Button>
					<Button className="all-device-button" onClick={props.onDelete}>
						<FontAwesomeIcon icon={faTrash} className="trash" size="xl" />
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
	width: 100%;

	button {
		margin-bottom: 5px;
	}

	.edit-input {
		width: -webkit-fill-available;
		border-radius: 10px;
		border: 1px solid gray;
		height: 30px;
		padding: 0 5px;
	}

	svg {
		padding-bottom: 5px;
		cursor: pointer;
	}

	@media (max-width: 830px) {
		.edit-input {
			font-size: 10px;
			width: 65px;
		}
	}

	@media (max-width: 500px) {
		.pen {
			width: 15px;
		}
		.trash {
			width: 15px;
		}
		.all-device-button {
			width: 30px;
			height: 35px;
		}

		.edit-input {
			font-size: 8px;
			width: 55px;
		}
	}
`;
