import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IInput } from '../../interfaces';
import styled from 'styled-components';

const InputContainer: React.FC<IInput> = ({
	className,
	value,
	icon,
	placeholder,
	type,
	onChange,
	registerProps,
	width,
	errorMessage,
}) => {
	return (
		<div className={className}>
			<div className="input-div" onClick={(e) => e.stopPropagation()}>
				{icon && <FontAwesomeIcon icon={icon} color="gray" />}
				<input
					className="input"
					placeholder={icon ? placeholder : ' '}
					type={`${type ? type : 'text'}`}
					value={value}
					onChange={onChange}
					{...registerProps}
				/>
				{!icon && <FloatingLabel width={width}>{placeholder}</FloatingLabel>}
			</div>
			<ErrorInput width={width}>{errorMessage}</ErrorInput>
		</div>
	);
};

export const Input = styled(InputContainer)`
	display: flex;
	flex-direction: column;
	width: ${(props) => `${props.width}px`};
	min-height: ${(props) => (props.height ? `${props.height}px` : '45px')};

	.input-div {
		position: relative;
		display: flex;
		align-items: center;
		border: ${(props) =>
			`${props.errorMessage ? '1px solid #ea0029' : '1px solid #ebe5e5'}`};
		border-radius: 10px;
		padding: 0 10px;
	}

	.input {
		border: none;
		outline: none;
		font-size: 15px;
		padding-left: ${(props) => `${props.icon ? 10 : 0}px`};
		width: ${(props) => `${props.width - 25}px`};
		height: ${(props) => (props.height ? `${props.height}px` : '45px')};
	}
`;

const FloatingLabel = styled.label<{ width: number }>`
	position: absolute;
	top: 30%;
	left: 7%;
	color: #aaa;
	font-size: ${(props) => `${props.width <= 70 ? '8px' : '10px'}`};
	pointer-events: none;
	transition: all 0.2s ease;
	input:focus + &,
	input:not(:placeholder-shown) + & {
		top: 1px;
		font-size: ${(props) => `${props.width <= 70 ? '8px' : '10px'}`};
		color: #555;
	}
`;

const ErrorInput = styled.span<{ width: number }>`
	color: #ea0029;
	font-size: ${(props) => `${props.width <= 70 ? '8px' : '11px'}`};
`;
