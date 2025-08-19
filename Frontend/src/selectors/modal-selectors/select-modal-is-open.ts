import type { RootState } from '../../store';

export const selectModalIsOpen = ({ appReducer }: RootState) => appReducer.modal.isOpen;
