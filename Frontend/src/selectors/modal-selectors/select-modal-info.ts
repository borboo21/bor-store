import type { RootState } from '../../store';

export const selectModalInfo = ({ appReducer }: RootState) => appReducer.modal.info;
