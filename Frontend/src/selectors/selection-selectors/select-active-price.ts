import type { DeviceSpecsDTO } from '../../../../shared';

export const selectActivePrice = (
	specsArray: DeviceSpecsDTO[],
	specId: string | null,
) => {
	const findSpec = specsArray.find((v) => v.specsId === specId);
	return findSpec?.price || 'Нет в наличии';
};
