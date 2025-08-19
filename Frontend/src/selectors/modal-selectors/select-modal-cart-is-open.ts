import type { RootState } from '../../store';

export const modalCartIsOpen = ({ appReducer }: RootState) => appReducer.modalCartIsOpen;
