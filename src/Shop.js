import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Error, Footer, Header, Modal, Navigation } from './components';
import {
	AddPage,
	AdminPage,
	AllPage,
	Authorization,
	Cart,
	DevicePage,
	Main,
	Orders,
	Registration,
} from './pages';
import { loadCartAsync, setCartStorage, setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

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
	@media (max-width: 1200px) {
		grid-template-columns: auto auto;
		width: 100%;
	}
`;

export const Shop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJson = sessionStorage.getItem('userData');
		const currentCartDataJson = sessionStorage.getItem('cartData');
		const currentCartData = JSON.parse(currentCartDataJson);
		const currentUserData = JSON.parse(currentUserDataJson);
		if (currentCartDataJson) {
			dispatch(setCartStorage([...currentCartData]));
		}
		if (currentUserDataJson) {
			dispatch(
				setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
			);
			dispatch(loadCartAsync(currentUserData.id));
		}
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Cart />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/admin/all" element={<AllPage />} />
					<Route path="/admin/add" element={<AddPage />} />
					<Route path="/admin/orders" element={<Orders />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/device/:device" element={<Main />} />
					<Route path="/device/:device/:id" element={<DevicePage />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Navigation />
			<Modal />
			<Footer />
		</AppColumn>
	);
};
