import type { DeviceSpecsDTO } from '../../../../shared';
import { SpecBlock } from '../tags-block';

type DeviceSpecsProps = {
	variants: DeviceSpecsDTO[];
	selectedSpecs: Record<string, string>;
	onSpecChange: (specName: string, value: string) => void;
};

function getUniqueValues<T extends keyof DeviceSpecsDTO>(
	variants: DeviceSpecsDTO[],
	key: T,
): string[] {
	console.log(variants);

	return Array.from(new Set(variants.map((v) => v[key]).filter(Boolean))) as string[];
}

export const DeviceSpecs: React.FC<DeviceSpecsProps> = ({
	variants,
	selectedSpecs,
	onSpecChange,
}) => {
	const specMap: Record<string, string[]> = {
		'Объем памяти': getUniqueValues(variants, 'storage'),
		ОЗУ: getUniqueValues(variants, 'ram'),
		SIM: getUniqueValues(variants, 'simType'),
		Диагональ: getUniqueValues(variants, 'diagonal'),
	};

	return (
		<>
			{Object.entries(specMap).map(([specName, values]) =>
				values.length >= 1 ? (
					<SpecBlock
						key={specName}
						specArr={values}
						selectedValue={selectedSpecs[specName]}
						specName={specName}
						paddingTag="8px 16px"
						fontSizeTag={13}
						onChange={(value: string) =>
							onSpecChange(specName, String(value))
						}
					/>
				) : null,
			)}
		</>
	);
};
