import type { RootState } from '../../store';

export const selectModalText = ({ appReducer }: RootState) => appReducer.modal.text;
