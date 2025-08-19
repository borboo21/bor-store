import { RootState } from 'store/store';

export const selectModalText = ({ appReducer }: RootState) => appReducer.modal.text;
