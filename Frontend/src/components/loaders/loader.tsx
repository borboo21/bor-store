import React from 'react';
import type { IComponentProps } from '../../interfaces';
import styled from 'styled-components';

const loaderContainer: React.FC<IComponentProps> = ({ className }) => (
	<span className={className}></span>
);

export const Loader = styled(loaderContainer)`
	width: 24px;
	height: 24px;
	border: 5px solid #979797;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
