const Snackbar = ({msg, error}) => {
	return (
		<div
			className={`${
				error ? 'bg-red-400' : 'bg-green-400'
			} absolute bottom-0 left-1/2 -translate-x-1/2 rounded py-2 px-4`}
		>
			<p className='text-white'>{msg}</p>
		</div>
	)
}

export default Snackbar
