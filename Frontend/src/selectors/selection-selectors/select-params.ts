import type { RootState } from './../../store/store';

export const selectParams = ({ selectionReducer }: RootState) => selectionReducer.params;
