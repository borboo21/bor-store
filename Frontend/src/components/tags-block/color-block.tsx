import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ColorTag } from '../tags/color-tag';

type ColorsBlockProps = {
	className?: string;
	colorArr: string[];
};

const ColorsBlockContainer: React.FC<ColorsBlockProps> = ({ className, colorArr }) => {
	const [activeColorTag, setActiveSpecTag] = useState(0);

	const handleClickColorTag = (index: number) => {
		setActiveSpecTag(index);
	};

	return (
		<div className={className}>
			<span className="colors-title">Цвет:</span>
			<div className="color-block">
				{colorArr.map((value, index) => (
					<ColorTag
						className="color-tag"
						key={index}
						color={value}
						disabled={activeColorTag === index}
						onClick={() => handleClickColorTag(index)}
					/>
				))}
			</div>
		</div>
	);
};

export const ColorBlock = styled(ColorsBlockContainer)`
	margin-bottom: 12px;

	.colors-title {
		margin-bottom: 6px;
		font-size: 13px;
		opacity: 0.5;
		text-transform: uppercase;
	}
	.color-block {
		margin: 3px 0 0 0;
	}

	.color-tag {
		margin: 6px 0 12px 0;
	}
`;
