import {useContext} from 'react'
import {SnackbarContext} from '../context'

const Snackbar = () => {
	const {error = false, message} = useContext(SnackbarContext)

	return (
		<div
			className={`${
				error ? 'bg-red-400' : 'bg-blue-400'
			} absolute bottom-0 left-1/2 -translate-x-1/2 rounded py-2 px-6 mb-2`}
		>
			<p className='text-white'>{message}</p>
		</div>
	)
}

export default Snackbar
