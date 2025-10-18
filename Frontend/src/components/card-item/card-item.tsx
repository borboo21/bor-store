import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardButton } from '../card-button/card-button';
import { SkeletonMain, SkeletonMainMobile } from '../loaders';
import { useWindowSize } from '@uidotdev/usehooks';
import { setDeviceColor, setDeviceParams } from '../../store/slices';
import { ColorBlockCard } from '../tags-block/color-block-card';
import type { ICardItem } from '../../interfaces';
import type { DeviceVariantDTO } from '../../../../shared';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const CardItemContainer: React.FC<ICardItem> = ({ className, loading, ...props }) => {
	const dispatch = useDispatch();
	const windowSize = useWindowSize();
	const variants = props.variants;
	const deviceColors = variants.map((value) => {
		const id = value.variantId;
		const color = value.color;
		return { id, color };
	});
	const onColorPick = (id: string) => {
		const findVariant = variants.find((variant) => variant.variantId === id);
		if (findVariant)
			dispatch(
				setDeviceColor({
					variantId: findVariant.variantId,
					color: findVariant.color,
					colorName: findVariant.colorName,
					imageURL: findVariant.imageUrl,
				}),
				dispatch(setDeviceParams(findVariant.specs[0])),
			);
	};
	const [selectedVariant, setSelectedVariant] = useState<DeviceVariantDTO>(variants[0]);

	const onColorChange = (id: string) => {
		const findVariant = variants.find((value) => value.variantId === id);
		if (findVariant) {
			setSelectedVariant(findVariant);
		}
	};

	const devicePrice = props.basePrice.toLocaleString('ru');

	return (
		<div className={className} key={props.key}>
			{loading ? (
				windowSize.width && windowSize.width <= 600 ? (
					<SkeletonMainMobile />
				) : (
					<SkeletonMain />
				)
			) : (
				<>
					<div className="device-image">
						<Link
							onClick={() => onColorPick(selectedVariant.variantId)}
							to={`/device/${props.category}/${props.id}`}
						>
							<img
								className="device-png"
								src={selectedVariant.imageUrl}
								alt="device"
							/>
						</Link>
					</div>
					<div className="card-bottom">
						<h5 className="device-name">{props.name}</h5>
						<ColorBlockCard
							colorArr={deviceColors}
							onColorChange={onColorChange}
						/>
						<div className="buy-panel">
							<div className="price">
								<span className="price-title">Цена:</span>
								<b className="price-bold">От {devicePrice}₽</b>
							</div>
							<Link to={`/device/${props.category}/${props.id}`}>
								<CardButton
									onClick={() => onColorPick(selectedVariant.variantId)}
									icon={faPlus}
									color="#ffffff"
								/>
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const CardItem = styled(CardItemContainer)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border: 1px solid #ebe5e5;
	padding: 20px;
	width: 220px;
	border-radius: 20px;
	margin: 0 40px 40px 40px;

	transition: box-shadow 0.2s ease-in-out, transform 0.3s ease-in-out;

	&:hover {
		box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
		transform: translateY(-5px);
	}

	.card-bottom {
		display: flex;
		flex-direction: column;
	}

	.price {
		display: flex;
		flex-direction: column;
	}

	.buy-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.device-png {
		width: 170px;
	}

	.device-name {
		margin: 10px 0 6px 0;
	}

	.price-title {
		margin-bottom: 6px;
	}

	@media (max-width: 600px) {
		width: 145px;
		margin: 0 20px 20px 20px;

		.device-png {
			width: 100px;
		}
		.device-name {
			font-size: 10px;
		}
		.price-title {
			font-size: 8px;
		}
		.price-bold {
			font-size: 11px;
		}
		.buy-panel {
			height: 60px;
		}
	}
`;
