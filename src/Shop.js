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
					<Route path="/iphone" element={<div>Айфон</div>} />
					<Route path="/:device/:id" element={<DevicePage />} />
					<Route path="/ipad" element={<div>Айпад</div>} />
					<Route path="/ipad/:id" element={<div>Айпад товар</div>} />
					<Route path="/watch/" element={<div>Часы</div>} />
					<Route path="/watch/:id" element={<div>Часы товар</div>} />
					<Route path="/airpods/" element={<div>Наушники</div>} />
					<Route path="/airpods/:id" element={<div>Наушники товар</div>} />
					<Route path="/macbook/" element={<div>Макбук</div>} />
					<Route path="/macbook/:id" element={<div>Макбук товар</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
