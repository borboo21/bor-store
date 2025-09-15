import styled from 'styled-components';
import type React from 'react';
import type { ReactEventHandler } from 'react';

type TagProps = {
	className?: string;
	value: string | number;
	onClick: ReactEventHandler;
	disabled: boolean;
	$padding?: string;
	$fontsize?: number;
};

const SpecTagContainer: React.FC<TagProps> = ({
	className,
	value,
	onClick,
	...props
}) => (
	<button className={className} onClick={onClick} {...props}>
		<span className="value">{value}</span>
	</button>
);

export const SpecTag = styled(SpecTagContainer)`
	color: ${(props) => (props.disabled ? '#ffffff' : '#000000')};
	background: ${(props) =>
		props.disabled ? 'linear-gradient(to right, #9dd558, #c4eb94)' : ' #eef0f2'};
	display: inline-flex;
	align-items: center;
	border: none;
	border-radius: 18px;
	padding: ${(props) => `${props.$padding}`};
	white-space: nowrap;
	cursor: pointer;
	margin-right: 6px;
	margin-bottom: 6px;

	.value {
		font-size: ${(props) => `${props.$fontsize}px`};
		line-height: 24px;
		min-width: 36px;
	}

	&:hover {
		color: #ffffff;
		background: linear-gradient(to right, #9dd558, #c4eb94);
	}
`;
