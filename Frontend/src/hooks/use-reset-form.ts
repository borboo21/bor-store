import { useEffect } from 'react';
import { useStore } from 'react-redux';
import type { RootState } from '../store';
import type { FieldValues, UseFormReset } from 'react-hook-form';

export const useResetForm = <T extends FieldValues>(reset: UseFormReset<T>) => {
	const store = useStore<RootState>();

	useEffect(() => {
		let currentWasLogout = store.getState().appReducer.wasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().appReducer.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
