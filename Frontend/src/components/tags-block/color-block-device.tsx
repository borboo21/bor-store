import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ColorTag } from '../tags/color-tag';
import { useSelector } from 'react-redux';
import { selectVariantId } from '../../selectors';

type ColorsBlockDeviceProps = {
	className?: string;
	colorArr: { id: string; color: string }[];
	onColorChange: (id: string) => void;
};

const ColorsBlockDeviceContainer: React.FC<ColorsBlockDeviceProps> = ({
	className,
	colorArr,
	onColorChange,
}) => {
	const variantId = useSelector(selectVariantId);

	const [activeColorTag, setActiveColorTag] = useState(variantId);

	if (!variantId) {
		setActiveColorTag(colorArr[0].id);
	}

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

export const ColorBlockDevice = styled(ColorsBlockDeviceContainer)`
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
