import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, GreenButton } from '../../components';
import { uploadCartAsync } from '../../actions';
import { useResetForm } from '../../hooks';
import { selectUserRoleIdSelector } from '../../selectors';
import { ROLE } from '../../constants';
import { request } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import type { IComponentProps } from '../../interfaces';
import { loadCartAsync, setUser, type AppDispatch } from '../../store';
import styled from 'styled-components';
import type { UserDTO } from '../../../../shared/types/interface';

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer: React.FC<IComponentProps> = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState<null | string>(null);

	const dispatch: AppDispatch = useDispatch();

	const roleId = useSelector(selectUserRoleIdSelector);

	useResetForm(reset);

	const onSubmit = ({ login, password }: { login: string; password: string }) => {
		request<UserDTO>('/api/auth/login', 'POST', { login, password }).then(
			(userData) => {
				console.log(userData);
				const error = userData.error;
				const user = userData.data;
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}
				dispatch(setUser(user));
				if (sessionStorage.cartData) {
					uploadCartAsync(
						user.id,
						JSON.parse(sessionStorage.getItem('cartData')!),
					).then(() => {
						dispatch(loadCartAsync(user.id));
					});
					sessionStorage.removeItem('cartData');
				} else {
					dispatch(loadCartAsync(user.id));
				}
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>
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
				<GreenButton place={20} right={true} icon={faArrowRight} type={'submit'}>
					Войти
				</GreenButton>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
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
