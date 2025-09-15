import styled from 'styled-components';
import type React from 'react';
import type { ReactEventHandler } from 'react';

type ColorTag = {
	className?: string;
	color: string;
	onClick: ReactEventHandler;
	disabled: boolean;
};

const ColorTagContainer: React.FC<ColorTag> = ({ className, onClick, ...props }) => (
	<label className={className}>
		<button className="color-picker" onClick={onClick} {...props}></button>
	</label>
);

export const ColorTag = styled(ColorTagContainer)`
	width: 28px;
	height: 28px;
	border-radius: 18px;
	border: ${(props) => (props.disabled ? '2px solid #9dd558' : 'none')};
	padding: 3px 2px;

	.color-picker {
		width: 24px;
		height: 24px;
		background-color: ${(props) => `${props.color}`};
		display: inline-flex;
		align-items: center;
		border: none;
		border-radius: 18px;
		padding: 6px 12px;
		white-space: nowrap;
		cursor: pointer;
	}
`;
