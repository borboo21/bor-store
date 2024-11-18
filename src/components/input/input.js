import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const inputContainer = ({ className, value, setValue, icon, placeholder, type }) => (
	<div className={className}>
		<FontAwesomeIcon icon={icon} color="gray" />
		<input
			className="input"
			placeholder={placeholder}
			type={`${type ? type : 'text'}`}
			value={value}
			onChange={({ target }) => setValue(target.value)}
		/>
	</div>
);

export const Input = styled(inputContainer)`
	border: 1px solid #ebe5e5;
	border-radius: 10px;
	padding: 0 15px;
	margin-bottom: 20px;
	width: 500px;

	.input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 400px;
	}
`;
