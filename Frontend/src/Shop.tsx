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
import { setCartStorage, setUser } from 'store/slices';
import { ERROR } from './constants';
import { AppDispatch } from './store/store';
import { loadCartAsync } from 'store/thunks';
import { ICartDevice, IUser } from 'interfaces/interface';
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
	const dispatch: AppDispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJson = sessionStorage.getItem('userData');
		const currentCartDataJson = sessionStorage.getItem('cartData');
		if (currentCartDataJson) {
			const currentCartData: [ICartDevice] = JSON.parse(currentCartDataJson);
			dispatch(setCartStorage(currentCartData));
		}
		if (currentUserDataJson) {
			const currentUserData: IUser = JSON.parse(currentUserDataJson);
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
