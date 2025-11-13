import styled, { keyframes } from 'styled-components';

import { useEffect, useState } from 'react';

interface ImageWithSkeleton {
	className?: string;
	src: string;
	alt?: string;
}

const ImageWithSkeletonContainer = ({ className, src, alt }: ImageWithSkeleton) => {
	const [currentSrc, setCurrentSrc] = useState(src);
	const [nextSrc, setNextSrc] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (src !== currentSrc) {
			setIsLoading(true);
			setNextSrc(src);
			const img = new Image();
			img.src = src;
			img.onload = () => {
				setCurrentSrc(src);
				setNextSrc(null);
				setIsLoading(false);
			};
			img.onerror = () => {
				setNextSrc(null);
				setIsLoading(false);
			};
		}
	}, [src, currentSrc]);

	return (
		<div className={className}>
			<StyledImage
				className="device-png"
				src={src}
				alt={alt}
				$isLoading={!isLoading}
			></StyledImage>
			{nextSrc && (
				<StyledImage
					className="device-png"
					src={src}
					alt={alt}
					$isLoading={false}
				></StyledImage>
			)}
			{isLoading && <Skeleton />}
		</div>
	);
};

export const ImageWithSkeleton = styled(ImageWithSkeletonContainer)`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	z-index: 0;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const StyledImage = styled.img<{ $isLoading: boolean }>`
	width: 100%;
	height: 100%;
	object-fit: contain;
	opacity: ${({ $isLoading }) => (!$isLoading ? 0 : 1)};
	transition: opacity 0.4s ease;
`;

const Skeleton = styled.div`
	position: absolute;
	inset: 0;
	background-color: #e5e7eb;
	animation: ${pulse} 1.5s ease-in-out infinite;
	border-radius: inherit;
`;
