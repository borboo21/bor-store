import { RootState } from 'store/store';
import { useEffect } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { useStore } from 'react-redux';

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
