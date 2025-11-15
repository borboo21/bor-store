import type { DeviceSpecsDTO } from '@shared/types';

export const selectActivePrice = (
	specsArray: DeviceSpecsDTO[],
	specId: string | null,
) => {
	const findSpec = specsArray.find((v) => v.specsId === specId);
	if (findSpec?.price === 0) {
		return 'Нет в наличии';
	}
	return findSpec?.price || 'Нет в наличии';
};
