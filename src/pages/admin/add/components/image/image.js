import styled from 'styled-components';

const imageContainer = ({ className, width, imageUrl, alt, description }) => (
	<div className={className}>
		<img width={width} src={`${imageUrl}`} alt={`${alt}`} />
		<span className="description">{description}</span>
	</div>
);

export const Image = styled(imageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		margin: 15px 7.5px 15px 7.5px;
	}
`;
