import type { RootState } from '../../store';

export const selectVariantId = ({ selectionReducer }: RootState) =>
	selectionReducer.variantId;
