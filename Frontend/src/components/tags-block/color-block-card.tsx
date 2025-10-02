import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ColorTag } from '../tags/color-tag';

type ColorsBlockCardProps = {
	className?: string;
	colorArr: { id: string; color: string }[];
	onColorChange: (id: string) => void;
};

const ColorsBlockCardContainer: React.FC<ColorsBlockCardProps> = ({
	className,
	colorArr,
	onColorChange,
}) => {
	const [activeColorTag, setActiveColorTag] = useState(colorArr[0].id);

	const handleClickColorTag = (id: string) => {
		setActiveColorTag(id);
		onColorChange(id);
	};

	return (
		<div className={className}>
			<span className="colors-title">Цвет:</span>
			<div className="color-block">
				{colorArr.map((value) => (
					<ColorTag
						className="color-tag"
						key={value.id}
						color={value.color}
						disabled={activeColorTag === value.id}
						onClick={() => handleClickColorTag(value.id)}
					/>
				))}
			</div>
		</div>
	);
};

export const ColorBlockCard = styled(ColorsBlockCardContainer)`
	margin-bottom: 12px;

	.colors-title {
		font-size: 13px;
		opacity: 0.5;
		text-transform: uppercase;
	}
	.color-block {
		margin: 6px 0 0 0;
	}

	.color-tag {
		margin: 6px 0 12px 0;
	}
`;
