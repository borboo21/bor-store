import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CounterItem } from '../counter/counter';
import styled from 'styled-components';
import { addCartAsync, deleteFromCartAsync } from '../../actions';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../selectors';

const CardItemContainer = ({ className, dispatch, ...props }) => {
	const cart = useSelector(cartSelector);

	const inCart = cart.devices.some((device) => device.id === props.id);

	const handleClickPlus = () => {
		dispatch(
			addCartAsync({
				id: props.id,
				category: props.category,
				imageUrl: props.imageUrl,
				name: props.name,
				price: props.price,
			}),
		);
	};

	const handleClickDelete = () => {
		dispatch(deleteFromCartAsync(props.id));
	};

	return (
		<div className={className}>
			<Link to={`/${props.category}/${props.id}`}>
				<img width={140} height={180} src={props.imageUrl} alt="device" />
				<h5>{props.name}</h5>
			</Link>
			<div className="cardBottom">
				<div className="price">
					<span>Цена:</span>
					<b>{props.price}₽</b>
				</div>
				{!inCart ? (
					<CardButton
						faIcon={faPlus}
						color="#ffffff"
						onClick={handleClickPlus}
					/>
				) : (
					<>
						<CounterItem />
						<CardButton
							faIcon={faCheck}
							color="#65ed65"
							onClick={handleClickDelete}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export const CardItem = styled(CardItemContainer)`
	border: 1px solid #ebe5e5;
	padding: 20px;
	width: 220px;
	border-radius: 20px;
	margin: 0 40px 40px 40px;
	transition:
		box-shadow 0.2s ease-in-out,
		transform 0.3s ease-in-out;

	&: hover {
		box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
		transform: translateY(-5px);
	}

	.cardBottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		display: flex;
		flex-direction: column;
	}
`;
