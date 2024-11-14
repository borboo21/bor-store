import { faX } from '@fortawesome/free-solid-svg-icons';
import { CardButton } from '../card-button/card-button';
import { CounterItem } from '../counter/counter';
import { deleteFromCartAsync } from '../../actions';
import styled from 'styled-components';

const cartItemContainer = ({ className, dispatch, ...props }) => {
	const handleClickX = () => {
		dispatch(deleteFromCartAsync(props.id));
	};

	return (
		<div className={className}>
			<img width={90} src={props.img} alt="device" />
			<div className="deviceInfo">
				<p className="deviceName">{props.name}</p>
				<b>{props.price}₽</b>
				<CounterItem />
			</div>
			{<CardButton faIcon={faX} onClick={handleClickX} />}
		</div>
	);
};

export const CartItem = styled(cartItemContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ebe5e5;
	border-radius: 20px;
	overflow: hidden;
	padding: 20px;
	margin-bottom: 20px;

	.deviceInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 120px;
		margin-right: 10px;
		font-size: 16px;
	}

	.deviceName {
		margin-bottom: 5px;
	}
`;
