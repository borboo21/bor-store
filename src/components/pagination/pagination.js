import styled from 'styled-components';
const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</button>
			<div className="current-page">Страница:{page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 10px 0;
	padding: 0 35px;

	& button {
		border: 1px solid #ebe5e5;
		background: white;
		border-radius: 20px;
		margin: 0 5px;
		cursor: pointer;
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
