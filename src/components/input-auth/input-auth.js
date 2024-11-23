import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputAuthContainer = forwardRef(({ className, icon, ...props }, ref) => {
	return (
		<div className={className}>
			<FontAwesomeIcon icon={icon} color="gray" />
			<input type={props.type} placeholder={props.placeholder} ref={ref} />
		</div>
	);
});

export const InputAuth = styled(InputAuthContainer)`
	display: flex;
	align-items: center;
	border: 1px solid #ebe5e5;
	border-radius: 10px;
	padding: 0 15px;
	margin-bottom: 20px;

	input {
		border: none;
		outline: none;
		padding: 13px;
		font-size: 16px;
	}
`;
