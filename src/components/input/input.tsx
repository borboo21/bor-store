import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IInput } from 'interfaces/interface';
import styled from 'styled-components';

const inputContainer: React.FC<IInput> = ({
	className,
	value,
	icon,
	placeholder,
	type,
	onChange,
}) => {
	return (
		<div className={className}>
			<FontAwesomeIcon icon={icon} color="gray" />
			<input
				className="input"
				placeholder={placeholder}
				type={`${type ? type : 'text'}`}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export const Input = styled(inputContainer)`
	display: flex;
	align-items: center;
	border: 1px solid #ebe5e5;
	border-radius: 10px;
	padding: 0 15px;
	margin-bottom: 20px;
	width: ${(props) => `${props.width}px`};

	.input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: ${(props) => `${props.width - 100}px`};
	}
`;
