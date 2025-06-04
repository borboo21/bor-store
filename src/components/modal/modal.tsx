import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button/button';
import {
	selectModalIsOpen,
	selectModalType,
	selectModalText,
	selectModalInfo,
} from '../../selectors';
import styled from 'styled-components';
import { IComponentProps } from 'interfaces/interface';
import { request } from 'utils';
import { AppDispatch } from 'store/store';
import { closeModal } from 'store/slices';

const ModalContainer: React.FC<IComponentProps> = ({ className }) => {
	const dispatch: AppDispatch = useDispatch();
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const type = useSelector(selectModalType);
	const info = useSelector(selectModalInfo);
	let onConfirm = () => {};
	let onCancel = () => {};

	if (!isOpen) {
		return null;
	}

	switch (type) {
		case 'deleteDevice': {
			onConfirm = () => {
				request(`/device/${info}`, 'DELETE');
				dispatch(closeModal());
			};
			onCancel = () => dispatch(closeModal());
		}
	}
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		width: 310px;
		margin: auto;
		padding: 0 20px 20px;
		text-align: center;
		z-index: 30;
		background-color: #fff;
		border: 3px solid #ebe5e5;
		border-radius: 20px;
		top: 50%;
		transform: translate(0, -50%);
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
