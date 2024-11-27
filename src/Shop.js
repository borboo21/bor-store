import { Route, Routes } from 'react-router';
import { Footer, Header } from './components';
import { Authorization, Cart, DevicePage, Main, Registration } from './pages';
import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { AdminPage, AddPage, AllPage } from './pages/admin';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	align-items: center;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
`;

const Page = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 120px 0px 20px;
	width: 1200px;
`;

export const Shop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJson = sessionStorage.getItem('userData');
		if (!currentUserDataJson) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJson);

		dispatch(
			setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }, [
				dispatch,
			]),
		);
	});

	const [cartOpened, setCartOpened] = useState(false);
	return (
		<AppColumn>
			<Header onClickCart={() => setCartOpened(true)} />
			{cartOpened && <Cart onClose={() => setCartOpened(false)} />}
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/admin/all" element={<AllPage />} />
					<Route path="/admin/add" element={<AddPage />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/:device" element={<Main />} />
					<Route path="/:device/:id" element={<DevicePage />} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
