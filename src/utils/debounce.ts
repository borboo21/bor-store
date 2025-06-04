export const debounce = (fn: Function, delay: number) => {
	let timeoutId: number;

	return (...args: boolean[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, delay, ...args);
	};
};
