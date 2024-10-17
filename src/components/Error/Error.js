import './style.css'
import { FcAbout } from 'react-icons/fc';

function Error({ message }) {
	return (
		<div className="error">
			<div className="error__icon">
				<FcAbout size='10em' />
			</div>
			<div className="error__text">{message}</div>
		</div>
	)
}

export default Error;