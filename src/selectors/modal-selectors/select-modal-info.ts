import { RootState } from 'store/store';

export const selectModalInfo = ({ appReducer }: RootState) => appReducer.modal.info;
