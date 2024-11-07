import styled from 'styled-components';
import { TableRow } from '../table-row/table-row';
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const DeviceRowContainer = ({ className }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [saveChanges, setSaveChanges] = useState(false);
	const [newName, setNewName] = useState('');
	const [newPrice, setNewPrice] = useState('');
	const [newURL, setNewURL] = useState('');

	const symbolLengthBlock = (string) => {
		if (string.length >= 17) {
			return string.substring(0, 17) + '...';
		}
	};

	const handleEditClick = () => {
		setIsEdit((prev) => !prev);
		console.log(newURL);
	};

	return (
		<div className={className}>
			{isEdit ? (
				<TableRow border={true}>
					<div className="category-column">iPhone</div>
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
				</TableRow>
			) : (
				<TableRow border={true}>
					<div className="category-column">iPhone</div>
					<div className="name-column">{newName}</div>
					<div className="price-column">{newPrice}</div>
					<div className="url-column">{symbolLengthBlock(newURL)}</div>
				</TableRow>
			)}
			<div className="controls">
				{isEdit ? (
					<FontAwesomeIcon
						icon={faFloppyDisk}
						onClick={handleEditClick}
						size="xl"
					/>
				) : (
					<FontAwesomeIcon icon={faPen} onClick={handleEditClick} size="xl" />
				)}
				<FontAwesomeIcon icon={faTrash} size="xl" />
			</div>
		</div>
	);
};

export const DeviceRow = styled(DeviceRowContainer)`
	display: flex;
	margin-top: 10px;
	font-size: 16px;
	width: 550px;

	.controls {
		margin-left: 10px;
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
