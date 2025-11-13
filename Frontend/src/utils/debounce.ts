export const debounce = <T extends unknown[], R>(
	fn: (...args: T) => R,
	delay: number,
) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: T): void => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
};
