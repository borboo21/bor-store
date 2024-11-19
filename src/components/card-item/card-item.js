import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { Link } from 'react-router-dom';
import { CounterItem } from '../counter/counter';
import { addCartAsync, deleteFromCartAsync } from '../../actions';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../selectors';
import styled from 'styled-components';

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
				quantity: 1,
			}),
		);
	};

	const handleClickDelete = (id) => {
		const quantityInCart = cart.devices.find(
			(cartItem) => cartItem.id === id,
		).quantity;
		dispatch(deleteFromCartAsync(props.id, props.price, quantityInCart));
	};

	return (
		<div className={className}>
			<div className="device-image">
				<Link to={`/${props.category}/${props.id}`}>
					<img width={170} src={props.imageUrl} alt="device" />
				</Link>
			</div>
			<div className="card-bottom">
				<h5>{props.name}</h5>
				<div className="buy-panel">
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
							<CounterItem id={props.id} price={props.price} />
							<CardButton
								faIcon={faCheck}
								color="#65ed65"
								onClick={() => handleClickDelete(props.id)}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export const CardItem = styled(CardItemContainer)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
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

	.card-bottom {
		display: flex;
		flex-direction: column;
	}

	.price {
		display: flex;
		flex-direction: column;
	}

	.buy-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
