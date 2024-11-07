import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const CardButtonContainer = ({className, faIcon, color, ...props}) => (
	<button className={className} {...props}>
		<FontAwesomeIcon icon={faIcon}/>
	</button>
	)


export const CardButton = styled(CardButtonContainer)`
		background-color: ${({color = '#ffffff;'}) => color};
		border: 1px solid #f2f2f2;
		box-sizing: border-box;
		border-radius: 8px;
		height: 32px;
		width: 32px;
		margin: ${({margin = '0' }) => margin};
		cursor: pointer;
		color: gray;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;

		&:hover {
		opacity: 1;
		}
`
