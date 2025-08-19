import { RootState } from 'store/store';

export const modalNavigationIsOpen = ({ appReducer }: RootState) =>
	appReducer.modalNavigationIsOpen;
