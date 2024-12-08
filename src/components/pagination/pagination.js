import styled from 'styled-components';
import { Button } from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faForward } from '@fortawesome/free-solid-svg-icons';
const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				<FontAwesomeIcon icon={faForward} rotation={180} />
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Button>
			<div className="current-page">Страница:{page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				<FontAwesomeIcon icon={faArrowRight} />
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				<FontAwesomeIcon icon={faForward} />
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 10px 0;
	padding: 0 35px;
	align-items: center;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		width: 50%;
		height: 32px;
		margin: 0px 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		border: 1px solid #ebe5e5;
		border-radius: 20px;
	}
`;
