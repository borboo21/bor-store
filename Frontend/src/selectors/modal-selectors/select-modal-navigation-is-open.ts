import type { RootState } from '../../store';

export const modalNavigationIsOpen = ({ appReducer }: RootState) =>
	appReducer.modalNavigationIsOpen;
