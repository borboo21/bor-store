import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, CardButton, Input } from '../../../../../components';
import styled from 'styled-components';
import type { DeviceForm } from '../../../../../interfaces';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SPEC_FIELDS_BY_CATEGORY } from '../../../../../constants';

const SpecsEditorContainer = ({
	className,
	variantIndex,
	isEdit,
	category,
}: {
	className?: string;
	variantIndex: number;
	isEdit: boolean;
	category: string;
}) => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<DeviceForm>();

	const {
		fields: specs,
		append: addSpec,
		remove: removeSpec,
	} = useFieldArray({
		control,
		name: `variants.${variantIndex}.specs`,
	});

	const availableFields: string[] =
		SPEC_FIELDS_BY_CATEGORY[category as keyof typeof SPEC_FIELDS_BY_CATEGORY];

	const handleAddSpec = () => {
		const newSpec = Object.fromEntries(availableFields.map((f) => [f, ''])) as {
			storage?: string | null;
			ram?: string | null;
			diagonal?: string | null;
			simType?: string | null;
		};
		addSpec({ ...newSpec, price: null });
	};

	const errorMessageSpec = errors.variants?.[variantIndex]?.specs;
	console.log(errorMessageSpec);

	return (
		<div className={className}>
			{specs.map((spec, specIndex) => (
				<div className="spec" key={spec.id}>
					{!isEdit ? (
						<>
							{availableFields.includes('storage') && (
								<p className="storage">{spec.storage}</p>
							)}
							{availableFields.includes('ram') && (
								<p className="ram">{spec.ram}</p>
							)}
							{availableFields.includes('diagonal') && (
								<p className="diagonal">{spec.diagonal}</p>
							)}
							{availableFields.includes('simType') && (
								<p className="sim-type">{spec.simType}</p>
							)}
							{availableFields.includes('price') && spec.price && (
								<p className="price">
									{spec.price.toLocaleString('ru')}₽
								</p>
							)}
						</>
					) : (
						<>
							{availableFields.includes('storage') && (
								<Input
									width={70}
									height={40}
									placeholder="Объем памяти"
									registerProps={register(
										`variants.${variantIndex}.specs.${specIndex}.storage`,
									)}
									errorMessage={
										errors.variants?.[variantIndex]?.specs?.[
											specIndex
										]?.storage?.message
									}
								></Input>
							)}
							{availableFields.includes('ram') && (
								<Input
									width={70}
									height={40}
									placeholder="Объем ОЗУ"
									registerProps={register(
										`variants.${variantIndex}.specs.${specIndex}.ram`,
									)}
									errorMessage={
										errors.variants?.[variantIndex]?.specs?.[
											specIndex
										]?.ram?.message
									}
								></Input>
							)}
							{availableFields.includes('diagonal') && (
								<Input
									width={70}
									height={40}
									placeholder="Диагональ"
									registerProps={register(
										`variants.${variantIndex}.specs.${specIndex}.diagonal`,
									)}
									errorMessage={
										errors.variants?.[variantIndex]?.specs?.[
											specIndex
										]?.diagonal?.message
									}
								></Input>
							)}
							{availableFields.includes('simType') && (
								<Input
									width={70}
									height={40}
									placeholder="Тип связи"
									registerProps={register(
										`variants.${variantIndex}.specs.${specIndex}.simType`,
									)}
									errorMessage={
										errors.variants?.[variantIndex]?.specs?.[
											specIndex
										]?.simType?.message
									}
								></Input>
							)}
							{availableFields.includes('price') && (
								<Input
									width={70}
									height={40}
									placeholder="Цена"
									registerProps={register(
										`variants.${variantIndex}.specs.${specIndex}.price`,
										{
											valueAsNumber: true,
										},
									)}
									errorMessage={
										errors.variants?.[variantIndex]?.specs?.[
											specIndex
										]?.price?.message
									}
								></Input>
							)}
							<Button
								className="delete-btn"
								icon={faTrash}
								onClick={() => removeSpec(specIndex)}
							></Button>
						</>
					)}
				</div>
			))}
			{isEdit ? (
				<div className="empty-row">
					<CardButton
						className="plus-btn"
						icon={faPlus}
						onClick={handleAddSpec}
					></CardButton>
					{errorMessageSpec && (
						<p className="error-spec">{errorMessageSpec.message}</p>
					)}
				</div>
			) : (
				''
			)}
		</div>
	);
};

export const SpecEditor = styled(SpecsEditorContainer)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-auto-flow: row;
	gap: 10px;
	justify-content: space-between;
	justify-items: center;
	align-items: center;

	.spec {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		min-width: 90px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

		.delete-btn {
			width: 25px;
			height: 25px;
		}

		input {
			font-size: 12px;
		}
	}

	.error-spec {
		color: #ea0029;
		font-size: 9px;
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media (max-width: 430px) {
		grid-template-columns: 1fr 1fr;

		.empty-row {
			grid-column: span 2;
		}
	}
`;
