import styled from 'styled-components';
import { Loader } from '../loaders';

interface AddImage {
	className?: string;
	width?: number;
	imageUrl: string;
	alt: string;
	description?: string;
}

const imageContainer = ({ className, width, imageUrl, alt, description }: AddImage) => (
	<div className={className}>
		{!imageUrl ? (
			<Loader />
		) : (
			<>
				<img width={width} src={`${imageUrl}`} alt={`${alt}`} />
				<span className="description">{description}</span>
			</>
		)}
	</div>
);

export const Image = styled(imageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
