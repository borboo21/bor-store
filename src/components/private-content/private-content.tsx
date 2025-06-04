import { useSelector } from 'react-redux';
import { selectUserRoleIdSelector } from '../../selectors';
import { checkAccess } from '../../utils';
import { ERROR } from '../../constants';
import { Error } from '../error/error';
import { IPrivateContent } from 'interfaces/interface';

export const PrivateContent: React.FC<IPrivateContent> = ({
	children,
	access,
	serverError = null,
}) => {
	const userRole = useSelector(selectUserRoleIdSelector);
	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
