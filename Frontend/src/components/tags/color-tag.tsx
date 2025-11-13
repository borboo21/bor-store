import styled from 'styled-components';
import type React from 'react';
import type { ReactEventHandler } from 'react';

type ColorTag = {
	className?: string;
	color: string;
	onClick?: ReactEventHandler;
	disabled?: boolean;
};

const ColorTagContainer: React.FC<ColorTag> = ({ className, onClick, ...props }) => (
	<button className={className} onClick={onClick} {...props}>
		<figure className="color-picker"></figure>
	</button>
);

export const ColorTag = styled(ColorTagContainer)`
	border-radius: 50%;
	border: ${(props) => (props.disabled ? '2px solid #9dd558' : 'none')};
	width: 32px;
	height: 32px;
	padding: 2px;
	background-color: transparent;

	.color-picker {
		width: 24px;
		height: 24px;
		background-color: ${(props) => `${props.color}`};
		box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px inset;
		display: inline-flex;
		align-items: center;
		margin: 0;
		border-radius: 50%;
		white-space: nowrap;
		cursor: pointer;
	}
`;
