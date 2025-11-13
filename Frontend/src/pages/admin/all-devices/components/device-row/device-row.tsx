import { TableRow } from '../table-row/table-row';
import {
	faCheck,
	faPlus,
	faTrash,
	faWandMagic,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CATEGORIES } from '../../../../../constants';
import { Button, CardButton, ColorPicker, Image, Input } from '../../../../../components';
import type { IDeviceRow, DeviceForm } from '../../../../../interfaces/interface';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { SpecEditor } from '../specs-editor/specs-editor';
import { editDeviceAsync } from '../../../../../actions';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWindowSize } from '@uidotdev/usehooks';

const DeviceRowContainer: React.FC<IDeviceRow> = ({ className, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const windowSize = useWindowSize();

	const handleEditClick = () => {
		setIsEdit((prev) => !prev);
		if (!isOpen) {
			setIsOpen((prev) => !prev);
		}
	};

	const handleCancelEditClick = () => {
		reset();
		setIsEdit((prev) => !prev);
	};

	const deviceFormSchema = yup.object().shape({
		category: yup.string().required(),
		name: yup.string().required('Заполните название'),
		basePrice: yup
			.number()
			.typeError('Введите цену числом')
			.required('Цена обязательна')
			.nullable()
			.min(0, 'Цена не может быть отрицательной'),
		variants: yup
			.array()
			.of(
				yup.object({
					color: yup
						.string()
						.required('Подберите цвет круглого индикатора')
						.matches(/^#([0-9A-Fa-f]{6})$/, 'Введите корректный HEX цвет'),
					colorName: yup.string().required('Название цвета обязательно'),
					imageUrl: yup
						.string()
						.required('Введите ссылку')
						.url('Введите правильную ссылку'),
					specs: yup
						.array()
						.of(
							yup.object({
								storage: yup
									.string()
									.required('Укажите объём Памяти')
									.matches(
										/^\d+(Gb|Tb)$/i,
										'Формат: например 128Gb или 1Tb',
									)
									.nullable()
									.optional(),
								ram: yup
									.string()
									.required('Укажите объём ОЗУ')
									.matches(/^\d+(Gb)$/i, 'Формат: например 16Gb')
									.nullable()
									.optional(),
								diagonal: yup
									.string()
									.required('Укажите диагональ')
									.matches(
										/^\d{1,2}(\.\d{1,2})?"$/,
										'Формат: например 13" или 15.6"',
									)
									.nullable()
									.optional(),
								simType: yup
									.string()
									.required('Укажите способ связи')
									.nullable()
									.optional(),
								price: yup
									.number()
									.typeError('Введите цену числом')
									.min(0, 'Цена не может быть отрицательной')
									.required('Заполните цену')
									.nullable(),
							}),
						)
						.required('У аппарата должна быть хоть одна спецификация')
						.min(1, 'Добавьте хотя бы одну спецификацию'),
				}),
			)
			.required('У варианта должен быть хоть один вариант')
			.min(1, 'Добавьте хотя бы один вариант'),
	});

	const methods = useForm<DeviceForm>({
		resolver: yupResolver(deviceFormSchema),
		defaultValues: {
			category: props.category,
			name: props.name,
			basePrice: props.basePrice,
			variants: props.variants.map((v) => ({
				color: v.color,
				colorName: v.colorName,
				imageUrl: v.imageUrl,
				specs: v.specs.map((s) => ({
					storage: s.storage,
					ram: s.ram,
					diagonal: s.diagonal,
					simType: s.simType,
					price: s.price,
				})),
			})),
		},
	});

	const onSubmit = (data: DeviceForm) => {
		editDeviceAsync(props.id, data);
		reset((prev) => ({
			...prev,
			...data,
		}));
		setIsEdit((prev) => !prev);
	};

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = methods;

	const {
		fields: variantFields,
		append: addVariant,
		remove: removeVariant,
	} = useFieldArray({
		control,
		name: 'variants',
	});

	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCategory = e.target.value;
		setValue('category', newCategory);
		setValue(
			'variants',
			variantFields.map((variant) => ({
				...variant,
				specs: [],
			})),
		);
	};

	return (
		<div className={className}>
			<FormProvider {...methods}>
				<>
					<div className="btn-control">
						<Button
							icon={faTrash}
							onClick={props.onDelete}
							width="25px"
							height="25px"
						></Button>
						{isEdit ? (
							<>
								<Button
									icon={faXmark}
									width="25px"
									height="25px"
									onClick={handleCancelEditClick}
								></Button>
								<Button
									icon={faCheck}
									onClick={handleSubmit(onSubmit)}
									width="25px"
									height="25px"
								></Button>
							</>
						) : (
							<Button
								icon={faWandMagic}
								onClick={handleEditClick}
								width="25px"
								height="25px"
							></Button>
						)}
					</div>
					<ExpandDrawer $isOpen={isOpen} key={props.id}>
						<TableRow
							onClick={!isEdit ? () => setIsOpen(!isOpen) : undefined}
							$isEdit={isEdit}
						>
							{!isEdit ? (
								<>
									<p className="category-column">{watch('category')}</p>
									<p className="name-column">{watch('name')}</p>
									<p className="price-column">
										{watch('basePrice')?.toLocaleString('ru')}₽
									</p>
								</>
							) : (
								<>
									<div
										className="select-div"
										onClick={(e) => e.stopPropagation()}
									>
										<select
											{...register('category')}
											onChange={(e) => handleChangeCategory(e)}
										>
											{CATEGORIES.map((categoryName, index) => (
												<option key={index} value={categoryName}>
													{categoryName}
												</option>
											))}
										</select>
									</div>
									<Input
										width={115}
										height={40}
										placeholder="Название"
										registerProps={register('name')}
										errorMessage={errors.name?.message}
									></Input>
									<Input
										width={95}
										height={40}
										placeholder="Базовая цена"
										registerProps={register('basePrice')}
										errorMessage={errors.basePrice?.message}
									></Input>
								</>
							)}
						</TableRow>
						<div className="drawer">
							{variantFields.map((variant, index) => (
								<div className="variant-spec" key={variant.id}>
									<div key={variant.id} className="variant">
										{!isEdit ? (
											<>
												<p className="color-name">
													{variant.colorName}
												</p>
												<img
													className="image"
													src={variant.imageUrl}
													width={70}
												/>
												<ColorPicker value={variant.color} />
											</>
										) : (
											<>
												<Input
													width={
														windowSize.width &&
														windowSize.width < 600
															? 90
															: 115
													}
													height={40}
													placeholder="Название цвета"
													registerProps={register(
														`variants.${index}.colorName`,
													)}
													errorMessage={
														errors.variants?.[index]
															?.colorName?.message
													}
												></Input>
												<div className="image-editor">
													<Image
														className="image"
														alt="Изображение товара"
														imageUrl={watch(
															`variants.${index}.imageUrl`,
														)}
														width={70}
													/>
													<Input
														width={125}
														height={40}
														placeholder="Ссылка изображения"
														registerProps={register(
															`variants.${index}.imageUrl`,
														)}
														errorMessage={
															errors.variants?.[index]
																?.imageUrl?.message
														}
													></Input>
												</div>
												<Controller
													control={control}
													name={`variants.${index}.color`}
													render={({ field }) => (
														<ColorPicker
															value={field.value}
															onChange={field.onChange}
														/>
													)}
												/>
												<Button
													className="delete-btn"
													icon={faTrash}
													onClick={() => removeVariant(index)}
												></Button>
											</>
										)}
									</div>
									<SpecEditor
										variantIndex={index}
										isEdit={isEdit}
										category={watch('category')}
									></SpecEditor>
								</div>
							))}
							{isEdit ? (
								<div className="variant">
									<CardButton
										className="plus-btn"
										icon={faPlus}
										onClick={() =>
											addVariant({
												color: '',
												colorName: '',
												imageUrl: '',
												specs: [],
											})
										}
									></CardButton>
								</div>
							) : (
								<></>
							)}
						</div>
					</ExpandDrawer>
				</>
			</FormProvider>
		</div>
	);
};

const ExpandDrawer = styled.div<{ $isOpen: boolean }>`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	transition: max-height 0.5s ease;
	min-height: 60px;
	max-height: ${({ $isOpen }) => ($isOpen ? 'max-content' : '60px')};
	background: #fff;
	border: 1px solid #eee;
	border-radius: 10px;

	.drawer {
		opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
		max-height: ${({ $isOpen }) => ($isOpen ? 'max-content' : '0')};
		overflow: hidden;
		transition: opacity 0.4s ease, max-height 0.5s ease;
		padding: ${({ $isOpen }) => ($isOpen ? '10px' : '0')};
	}

	@media (max-width: 700px) {
		min-width: 410px;
	}

	@media (max-width: 480px) {
		min-width: 255px;
	}
`;

export const DeviceRow = styled(DeviceRowContainer)`
	display: flex;
	flex-direction: column;
	position: relative;
	margin-top: 10px;
	font-size: 14px;
	width: 100%;
	max-width: 610px;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

	p {
		margin: 5px 0;
	}

	.btn-control {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		position: absolute;
		gap: 5px;
		top: 2px;
		left: 610px;
		opacity: 0;
		transform: translateX(-35px);
		transition: all 0.3s ease;
		pointer-events: none;
	}

	&:hover .btn-control {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}

	.variant {
		display: grid;
		border-radius: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
		grid-template-columns: 1fr 140px 1fr;
		margin: 10px;
		padding: 10px 0;
		gap: 10px;
		justify-items: center;
		align-items: center;
		min-height: 135px;
	}
	.delete-btn {
		width: 40px;
		height: 30px;
		grid-column: span 3;
	}

	.select-div {
		display: flex;
		align-items: center;
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 10px;
		height: 40px;
		width: 100px;
		select {
			border: none;
			outline: none;
			font-size: 14px;
			width: 80px;
			height: 35px;
			cursor: pointer;
			background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
				no-repeat 105% 50%;
			-moz-appearance: none;
			-webkit-appearance: none;
			appearance: none;
		}
	}
	.image-editor {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 10px;
	}

	@media (max-width: 700px) {
		max-width: 410px;

		.variant {
			grid-template-columns: 1fr 65px 1fr;
		}
		.specs {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		}
		.btn-control {
			left: 410px;
		}
	}

	@media (max-width: 480px) {
		max-width: 255px;
		font-size: 11px;

		.variant {
			grid-template-columns: 1fr;
		}
		.delete-btn {
			grid-column: span 1;
		}
		.specs {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.btn-control {
			left: 255px;
		}
	}
`;
