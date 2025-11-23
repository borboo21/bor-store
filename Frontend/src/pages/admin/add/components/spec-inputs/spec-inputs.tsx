import {
	faArrowLeft,
	faArrowRight,
	faRubleSign,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import { GreenButton, Input } from '../../../../../components';
import styled from 'styled-components';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { DeviceForm } from '../../../../../interfaces';

type SpecInputs = {
	variantIndex: number;
	onBack: () => void;
	availableFields: string[];
};
const SpecInputsComponent: React.FC<SpecInputs> = ({
	variantIndex,
	onBack,
	availableFields,
}) => {
	const {
		control,
		register,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext<DeviceForm>();

	const variants = watch('variants');

	const {
		fields: specs,
		append,
		remove: removeSpec,
		replace,
	} = useFieldArray({ control, name: `variants.${variantIndex}.specs` });

	const handleCopyFromFirstSpecs = () => {
		const values = getValues();
		const firstSpecs = values.variants[0].specs;
		replace(firstSpecs);
	};

	const addSpec = () => {
		const newSpec = Object.fromEntries(availableFields.map((f) => [f, ''])) as {
			storage?: string | null;
			ram?: string | null;
			diagonal?: string | null;
			simType?: string | null;
		};
		append({ ...newSpec, price: null });
	};

	return (
		<>
			{specs.map((spec, index) => (
				<>
					<div key={spec.id} className="input-containers">
						{availableFields.includes('storage') && (
							<Input
								width={320}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.storage`,
								)}
								placeholder={'Укажите объем памяти'}
								errorMessage={
									errors.variants?.[variantIndex]?.specs?.[index]
										?.storage?.message
								}
							/>
						)}
						{availableFields.includes('ram') && (
							<Input
								width={320}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.ram`,
								)}
								placeholder={'Укажите ОЗУ'}
								errorMessage={
									errors.variants?.[variantIndex]?.specs?.[index]?.ram
										?.message
								}
							/>
						)}
						{availableFields.includes('simType') && (
							<Input
								width={320}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.simType`,
								)}
								placeholder={'Укажите способ связи'}
								errorMessage={
									errors.variants?.[variantIndex]?.specs?.[index]
										?.simType?.message
								}
							/>
						)}
						{availableFields.includes('diagonal') && (
							<Input
								width={320}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.diagonal`,
								)}
								placeholder={'Укажите диагональ дисплея'}
								errorMessage={
									errors.variants?.[variantIndex]?.specs?.[index]
										?.diagonal?.message
								}
							/>
						)}
						{availableFields.includes('price') && (
							<Input
								width={320}
								icon={faRubleSign}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.price`,
									{
										valueAsNumber: true,
									},
								)}
								placeholder={'Укажите цену'}
								errorMessage={
									errors.variants?.[variantIndex]?.specs?.[index]?.price
										?.message
								}
							/>
						)}
						<GreenButton
							className="control-button"
							left={true}
							place={140}
							onClick={() => removeSpec(index)}
							icon={faArrowLeft}
							disabled={specs.length === 1 && !spec.price}
						>
							Удалить
						</GreenButton>
					</div>
				</>
			))}
			<div className="final-btn-group">
				<GreenButton
					className="control-button"
					left={true}
					place={140}
					onClick={() => onBack()}
					icon={faArrowLeft}
				>
					Вернуться
				</GreenButton>
				<GreenButton
					className="control-button"
					right={true}
					place={10}
					onClick={addSpec}
					icon={faArrowRight}
				>
					Добавить еще спецификацию
				</GreenButton>
				{variants[0].specs.length > 1 && variantIndex !== 0 && (
					<GreenButton
						className="copy-button"
						right={true}
						place={10}
						onClick={() => handleCopyFromFirstSpecs()}
						icon={faArrowRight}
					>
						Добавить спецификации из первого варианта
					</GreenButton>
				)}
			</div>
		</>
	);
};

export const SpecInputs = styled(SpecInputsComponent)``;
