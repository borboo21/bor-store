import { Route, Routes } from 'react-router';
import { Footer, Header } from './components';
import { Cart, DevicePage, Main } from './pages';
import { useState } from 'react';
import styled from 'styled-components';
import { AdminPage, AddPage, AllPage } from './pages/admin';

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
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/:device" element={<Main />} />
					<Route path="/:device/:id" element={<DevicePage />} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
