import type { RootState } from '../../store';

export const selectSpecId = ({ selectionReducer }: RootState) => selectionReducer.specId;
