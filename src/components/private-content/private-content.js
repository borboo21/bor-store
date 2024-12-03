import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors';
import { checkAccess } from '../../utils';
import { ERROR } from '../../constants';
import { Error } from '../error/error';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const user = useSelector(userSelector);
	const userRole = user.roleId;
	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
