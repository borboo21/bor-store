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
};
const SpecInputsComponent: React.FC<SpecInputs> = ({ variantIndex, onBack }) => {
	const { control, register, watch, getValues } = useFormContext<DeviceForm>();

	const category = watch('category');
	const variants = watch('variants');

	const {
		fields: specs,
		append: addSpec,
		remove: removeSpec,
		replace,
	} = useFieldArray({ control, name: `variants.${variantIndex}.specs` });

	const handleCopyFromFirstSpecs = () => {
		const values = getValues();
		const firstSpecs = values.variants[0].specs;
		replace(firstSpecs);
	};

	console.log(specs.length === 1);

	return (
		<>
			{specs.map((spec, index) => (
				<>
					<div key={spec.id} className="input-containers">
						{category !== 'AirPods' && (
							<Input
								width={350}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.storage`,
								)}
								placeholder={'Укажите объем памяти'}
							/>
						)}
						{category === 'MacBook' && (
							<Input
								width={350}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.ram`,
								)}
								placeholder={'Укажите ОЗУ'}
							/>
						)}
						{(category === 'iPad' || category === 'iPhone') && (
							<Input
								width={350}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.simType`,
								)}
								placeholder={'Укажите способ связи'}
							/>
						)}
						{(category === 'MacBook' || category === 'iPad') && (
							<Input
								width={350}
								icon={faTag}
								registerProps={register(
									`variants.${variantIndex}.specs.${index}.diagonal`,
								)}
								placeholder={'Укажите диагональ дисплея'}
							/>
						)}
						<Input
							width={350}
							icon={faRubleSign}
							registerProps={register(
								`variants.${variantIndex}.specs.${index}.price`,
								{
									valueAsNumber: true,
								},
							)}
							placeholder={'Укажите цену'}
						/>
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
					onClick={() =>
						addSpec({
							storage: '',
							ram: '',
							simType: '',
							diagonal: '',
							price: null,
						})
					}
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
