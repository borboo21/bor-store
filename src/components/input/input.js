import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const inputContainer = ({
	className,
	value,
	setValue,
	icon,
	placeholder,
	type,
	width,
	onChange,
}) => (
	<div className={className}>
		<FontAwesomeIcon icon={icon} color="gray" />
		<input
			className="input"
			placeholder={placeholder}
			type={`${type ? type : 'text'}`}
			value={value}
			onChange={setValue ? ({ target }) => setValue(target.value) : onChange}
		/>
	</div>
);

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
