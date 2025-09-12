import type { RootState } from '../../store';

export const selectModalType = ({ appReducer }: RootState) => appReducer.modal.type;
