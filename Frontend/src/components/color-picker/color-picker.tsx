import React, { useRef } from 'react';
import styled from 'styled-components';

type ColorPickerProps = {
	className?: string;
	value: string;
	onChange?: (value: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
	const colorInputRef = useRef<HTMLInputElement | null>(null);

	const handleCircleClick = () => {
		colorInputRef.current?.click();
	};

	return (
		<ColorPickerWrapper>
			<HiddenColorInput
				ref={colorInputRef}
				value={value}
				disabled={onChange ? false : true}
				onChange={(e) => (onChange ? onChange(e.target.value) : '')}
			/>
			<ColorCircle color={value} onClick={handleCircleClick} />
			<span>{value}</span>
		</ColorPickerWrapper>
	);
};

const ColorPickerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	width: 100%;
`;

const HiddenColorInput = styled.input.attrs({ type: 'color' })`
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
	border: none;
	padding: 0;
	margin: 0;
`;

const ColorCircle = styled.div<{ color: string }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ color }) => color};
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px inset;
	cursor: pointer;
	transition: transform 0.15s ease, box-shadow 0.15s ease;

	&:hover {
		transform: scale(1.1);
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
	}
`;
