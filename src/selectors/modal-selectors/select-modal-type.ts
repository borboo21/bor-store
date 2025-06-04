import { RootState } from 'store/store';

export const selectModalType = ({ appReducer }: RootState) => appReducer.modal.type;
