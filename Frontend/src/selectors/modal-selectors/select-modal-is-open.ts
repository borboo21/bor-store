import { RootState } from 'store/store';

export const selectModalIsOpen = ({ appReducer }: RootState) => appReducer.modal.isOpen;
