import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, GreenButton } from '../../components';
import { useResetForm } from '../../hooks';
import { uploadCartAsync } from '../../actions';
import { setUser } from 'store/slices';
import { ROLE } from '../../constants';
import { request } from '../../utils';
import { faArrowRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IComponentProps } from 'interfaces/interface';
import styled from 'styled-components';
import { selectUserRoleIdSelector } from 'selectors';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин.Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки #, %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль.Максимум 30 символов'),
	passCheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
});

const RegistrationContainer: React.FC<IComponentProps> = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passCheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState<null | string>(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRoleIdSelector);

	useResetForm(reset);

	const onSubmit = ({ login, password }: { login: string; password: string }) =>
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			if (sessionStorage.cartData) {
				uploadCartAsync(user.id, JSON.parse(sessionStorage.getItem('cartData')!));
				sessionStorage.removeItem('cartData');
			}
		});

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-auth">
					<FontAwesomeIcon icon={faUser} color="gray" />
					<input
						type="text"
						placeholder="Логин..."
						{...register('login', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
				<div className="input-auth">
					<FontAwesomeIcon icon={faLock} color="gray" />
					<input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
				<div className="input-auth">
					<FontAwesomeIcon icon={faLock} color="gray" />
					<input
						type="password"
						placeholder="Проверка пароля..."
						{...register('passCheck', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
				<GreenButton place={20} right={true} icon={faArrowRight} type={'submit'}>
					Войти
				</GreenButton>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	.input-auth {
		display: flex;
		align-items: center;
		border: 1px solid #ebe5e5;
		border-radius: 10px;
		padding: 0 15px;
		margin-bottom: 20px;
	}

	input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
