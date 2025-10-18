import { useEffect, useState } from 'react';
import { BreadCrumbs, GreenButton, Input, PrivateContent } from '../../../components';
import {
	faArrowLeft,
	faArrowRight,
	faLink,
	faList,
	faRubleSign,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import { addDeviceAsync } from '../../../actions';
import { ColorPicker, Image, SpecInputs } from './components';
import { CATEGORIES, ROLE } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkAccess } from '../../../utils';
import { useSelector } from 'react-redux';
import { selectUserRoleIdSelector } from '../../../selectors';
import type { DeviceForm, IComponentProps } from '../../../interfaces';
import styled from 'styled-components';
import {
	Controller,
	FormProvider,
	useFieldArray,
	useForm,
	useWatch,
} from 'react-hook-form';

const AddPageContainer: React.FC<IComponentProps> = ({ className }) => {
	const userRole = useSelector(selectUserRoleIdSelector);
	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
	}, [userRole]);

	const methods = useForm<DeviceForm>({
		defaultValues: {
			category: CATEGORIES[0],
			name: '',
			basePrice: null,
			variants: [],
		},
	});
	const { control, register, handleSubmit, watch, reset } = methods;

	const [step, setStep] = useState(1);
	const [activeVariant, setActiveVariant] = useState<null | number>(null);

	const addDevice = (data: DeviceForm) => {
		const cleanedData: DeviceForm = {
			...data,
			variants: data.variants.map((variant) => ({
				...variant,
				specs: variant.specs.map(
					(spec) =>
						Object.fromEntries(
							Object.entries(spec).filter(
								([, value]) => value !== '' && value !== undefined,
							),
						) as typeof spec,
				),
			})),
		};
		addDeviceAsync(cleanedData);
		reset();
		setStep(1);
	};
	const {
		fields: variants,
		append: addVariant,
		remove: removeVariant,
	} = useFieldArray({ control, name: 'variants' });

	const onClickAddColor = () => {
		if (variants.length < 1) {
			addVariant({
				color: '#FFFFFF',
				colorName: '',
				imageUrl: '',
				specs: [
					{
						storage: '',
						ram: '',
						simType: '',
						diagonal: '',
						price: null,
					},
				],
			});
		}
		setStep(2);
	};

	const onClickAddSpec = (index: number) => {
		setActiveVariant(index);
		setStep(3);
	};

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const values = useWatch({ control });
	console.log(values);

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<BreadCrumbs lastName={'Добавление товара'} />
				<FormProvider {...methods}>
					<div className="add-main">
						{step === 1 && (
							<>
								<div className="input-containers">
									<div className="select-div">
										<FontAwesomeIcon icon={faList} color="gray" />
										<select {...register('category')}>
											{CATEGORIES.map((categoryName, index) => (
												<option key={index} value={categoryName}>
													{categoryName}
												</option>
											))}
										</select>
									</div>
									<Input
										width={350}
										icon={faTag}
										placeholder={'Укажите имя товара'}
										registerProps={register('name')}
									/>
									<Input
										width={350}
										icon={faRubleSign}
										placeholder={'Укажите самую низкую цену'}
										registerProps={register('basePrice', {
											valueAsNumber: true,
										})}
									/>
									<GreenButton
										className="color-button"
										onClick={onClickAddColor}
										right={true}
										place={20}
										icon={faArrowRight}
										disabled={!watch('name') || !watch('basePrice')}
									>
										Добавить цвет
									</GreenButton>
								</div>
							</>
						)}
						{step === 2 && (
							<>
								{variants.map((variant, index) => (
									<div key={variant.id} className="input-containers">
										{isValidUrl(
											watch(`variants.${index}.imageUrl`),
										) && (
											<>
												<div className="img-block">
													<Image
														width={306}
														imageUrl={watch(
															`variants.${index}.imageUrl`,
														)}
														alt={'На странице товара'}
														description={'На странице товара'}
													/>
													<Image
														width={170}
														imageUrl={watch(
															`variants.${index}.imageUrl`,
														)}
														alt={'На главной'}
														description={'На главной'}
													/>
													<Image
														width={90}
														imageUrl={watch(
															`variants.${index}.imageUrl`,
														)}
														alt={'Изображение в корзине'}
														description={'В корзине'}
													/>
												</div>
											</>
										)}
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
										<Input
											width={350}
											icon={faTag}
											placeholder={'Укажите название цвета'}
											registerProps={register(
												`variants.${index}.colorName`,
											)}
										/>
										<Input
											width={350}
											icon={faLink}
											placeholder={'Ссылка на изображение'}
											registerProps={register(
												`variants.${index}.imageUrl`,
											)}
										/>
										<div className="btn-group">
											<GreenButton
												className="control-button"
												place={140}
												left={true}
												icon={faArrowLeft}
												onClick={() => removeVariant(index)}
												disabled={variants.length === 1}
											>
												Удалить
											</GreenButton>
											<GreenButton
												className="control-button"
												place={10}
												right={true}
												icon={faArrowRight}
												onClick={() => onClickAddSpec(index)}
											>
												Добавить спецификацию
											</GreenButton>
										</div>
									</div>
								))}
								<div className="final-btn-group">
									<GreenButton
										className="control-button"
										left={true}
										place={140}
										onClick={() => setStep(1)}
										icon={faArrowLeft}
									>
										Вернуться
									</GreenButton>
									<GreenButton
										className="control-button"
										onClick={() =>
											addVariant({
												color: '#FFFFFF',
												colorName: '',
												imageUrl: '',
												specs: [
													{
														storage: '',
														ram: '',
														simType: '',
														diagonal: '',
														price: null,
													},
												],
											})
										}
									>
										Добавить цвет
									</GreenButton>
									<GreenButton
										className="final-button"
										onClick={handleSubmit(addDevice)}
										right={true}
										icon={faArrowRight}
										place={10}
									>
										Добавить товар
									</GreenButton>
								</div>
							</>
						)}
						{step === 3 && activeVariant !== null && (
							<SpecInputs
								variantIndex={activeVariant}
								onBack={() => setStep(2)}
							/>
						)}
					</div>
				</FormProvider>
			</div>
		</PrivateContent>
	);
};

export const AddPage = styled(AddPageContainer)`
	min-width: 60%;

	.add-main {
		display: flex;
		flex-direction: column;
		min-height: 70vh;
		align-items: center;
		justify-content: space-between;
	}

	.img-block {
		display: flex;
		align-items: flex-end;
		gap: 10px;
		padding-bottom: 30px;
		flex-wrap: wrap;
	}

	.input-containers {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 20px;
	}

	.select-div {
		display: flex;
		align-items: center;
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 15px;
		margin-bottom: 20px;
		width: 350px;
	}
	.select-color-input {
		display: flex;
		width: 24px;
		height: 24px;
		border: 1px solid #ebe5e5;
		border-radius: 10px;
	}
	.color-button {
		width: 60%;
		.btn-p {
			width: 130px;
		}
	}
	.btn-group {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		width: fit-content;
		max-width: 350px;
	}

	.control-button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		width: 170px;
	}

	.final-btn-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
		width: fit-content;
		max-width: 350px;
		margin-top: 36px;
	}

	.copy-button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		width: 170px;
	}

	.btn-p {
		width: 110px;
	}

	select {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
		width: 300px;
		cursor: pointer;
		background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
			no-repeat 95% 50%;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
	}

	@media (max-width: 600px) {
		.img-block {
			align-items: center;
			flex-direction: column;
		}
	}
`;
/* {isValidUrl(imageUrl) && (
						<div className="img-block">
							<Image
								width={310}
								imageUrl={imageUrl}
								alt={'На странице товара'}
								description={'На странице товара'}
							/>
							<Image
								width={170}
								imageUrl={imageUrl}
								alt={'На главной'}
								description={'На главной'}
							/>
							<Image
								width={90}
								imageUrl={imageUrl}
								alt={'Изображение в корзине'}
								description={'В корзине'}
							/>
						</div>
					)} */
