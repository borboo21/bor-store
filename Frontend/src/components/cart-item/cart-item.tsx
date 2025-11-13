import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../loaders';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import { deleteFromCart, deleteFromCartAsync, type AppDispatch } from '../../store';
import { selectUserRoleIdSelector, userIdSelector } from '../../selectors';
import type { ICartDevice } from '../../interfaces';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ColorTag } from '../tags/color-tag';
import { SpecBlock } from '../tags-block';

const CartItemContainer: React.FC<ICartDevice> = ({ className, ...props }) => {
	const dispatch: AppDispatch = useDispatch();
	const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
	const userId = useSelector(userIdSelector);
	const userRole = useSelector(selectUserRoleIdSelector);
	const specProps = [props.storage, props.simType, props.diagonal, props.ram].filter(
		Boolean,
	) as string[];

	const handleClickX = () => {
		if (userRole !== 3) {
			dispatch(
				deleteFromCartAsync({
					specId: props.specId,
					userId,
					price: props.price,
					quantity: props.quantity,
					setIsLoadingSpinner,
				}),
			);
		} else {
			dispatch(
				deleteFromCart({
					specId: props.specId,
					price: props.price,
					quantity: props.quantity,
				}),
			);
		}
	};

	const price = props.price.toLocaleString('ru');

	return (
		<div className={className}>
			<div className="photo-specs">
				<img
					className="device-photo"
					width={90}
					src={props.imageUrl}
					alt="device"
				/>
				<CounterItem specId={props.specId} price={props.price} />
			</div>
			<div className="device-info">
				<p className="device-name">{props.name}</p>
				{specProps && <SpecBlock specArr={specProps} fontSizeTag={12} />}
				<div className="device-color">
					<ColorTag color={props.color} />
					<p className="color-name">{props.colorName}</p>
				</div>
				<b>{price}₽</b>
			</div>
			{isLoadingSpinner ? (
				<Loader />
			) : (
				<CardButton icon={faX} onClick={handleClickX} />
			)}
		</div>
	);
};

export const CartItem = styled(CartItemContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ebe5e5;
	border-radius: 20px;
	padding: 20px;
	margin-bottom: 20px;

	.device-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		font-size: 18px;
	}

	.photo-specs {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.device-photo {
		padding-bottom: 10px;
	}

	.device-name {
		margin-top: 0;
		margin-bottom: 5px;
		text-align: center;
	}

	.device-color {
		display: flex;
		align-items: center;
	}

	.device-specs {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.color-name {
		font-size: 12px;
	}

	@media (max-width: 420px) {
		.device-info {
			margin: 0 10px 0 10px;
			font-size: 16px;
		}
	}
`;
