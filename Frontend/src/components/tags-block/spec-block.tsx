import type React from 'react';
import { SpecTag } from '../tags/spec-tag';
import styled from 'styled-components';

type SpecBlockProps = {
	className?: string;
	specArr: string[];
	specName?: string;
	paddingTag?: string;
	fontSizeTag?: number;
	selectedValue?: string;
	onChange?: (value: string) => void;
};

const SpecBlockContainer: React.FC<SpecBlockProps> = ({
	className,
	specArr,
	specName,
	paddingTag,
	fontSizeTag,
	onChange,
	selectedValue,
}) => {
	return (
		<div className={className}>
			{specName && <span className="spec-title">{specName}:</span>}
			<div className="spec-block">
				{specArr.map((value, index) => (
					<SpecTag
						key={index}
						value={value}
						disabled={selectedValue ? selectedValue === value : true}
						onClick={onChange ? () => onChange(value) : undefined}
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
