import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type ScrollToTopProps = {
	className?: string;
};

const ScrollToTopContainer: React.FC<ScrollToTopProps> = ({ className }) => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const toogleVisibility = () => {
			setVisible(window.scrollY > 300);
		};
		window.addEventListener('scroll', toogleVisibility);
		return () => window.removeEventListener('scroll', toogleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<StyledWrapper $visible={visible}>
			<button className={className} onClick={scrollToTop}>
				<FontAwesomeIcon className="arrow" icon={faUpLong} />
			</button>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div<{ $visible: boolean }>`
	position: fixed;
	bottom: 10px;
	right: 10px;
	z-index: 1000;
	transition: opacity 0.3s ease, transform 0.3s ease;
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
	pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`;
export const ScrollToTopButton = styled(ScrollToTopContainer)`
	background: #fff;
	color: gray;
	border: 1px solid #f2f2f2;
	border-radius: 50%;
	padding: 8px;
	cursor: pointer;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}

	@media (max-width: 600px) {
		padding: 3px;
	}

	& .arrow {
		font-size: 20px;
		padding: 8px;

		@media (max-width: 600px) {
			font-size: 12px;
			padding: 3px;
		}
	}
`;
