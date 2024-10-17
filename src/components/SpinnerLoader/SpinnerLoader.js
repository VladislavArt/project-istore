import './style.css'

import { BounceLoader } from 'react-spinners'

const SpinnerLoader = () => {
	return (
		<div className='spinnerLoader'>
			<BounceLoader color='#86d0ff' />
		</div>
	)
}

export default SpinnerLoader