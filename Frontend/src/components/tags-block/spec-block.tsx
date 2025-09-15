import type React from 'react';
import { SpecTag } from '../tags/spec-tag';
import { useState } from 'react';
import styled from 'styled-components';

type SpecBlockProps = {
	className?: string;
	specArr: (string | number)[];
	specName: string;
	paddingTag: string;
	fontSizeTag: number;
};

const SpecBlockContainer: React.FC<SpecBlockProps> = ({
	className,
	specArr,
	specName,
	paddingTag,
	fontSizeTag,
}) => {
	const [activeSpecTag, setActiveSpecTag] = useState(0);

	const handleClickSpecTag = (index: number) => {
		setActiveSpecTag(index);
	};

	return (
		<div className={className}>
			<span className="spec-title">{specName}:</span>
			<div className="spec-block">
				{specArr.map((value, index) => (
					<SpecTag
						key={index}
						value={value}
						disabled={activeSpecTag === index}
						onClick={() => handleClickSpecTag(index)}
						$padding={paddingTag}
						$fontsize={fontSizeTag}
					/>
				))}
			</div>
		</div>
	);
};

export const SpecBlock = styled(SpecBlockContainer)`
	margin: 6px 0 0 0;

	.spec-title {
		margin-bottom: 6px;
		font-size: 13px;
		opacity: 0.5;
		text-transform: uppercase;
	}
	.spec-block {
		margin: 3px 0 0 0;
	}
`;
