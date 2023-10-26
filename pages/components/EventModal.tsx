type EventModalProps = {
	isCreating: boolean
}

const EventModal = (props: EventModalProps) => {
	const {isCreating} = props

	return (
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<form className='bg-white rounded-lg shadow-2xl xl:w-1/4'>
				<div className='flex justify-between items-center border-b border-gray-100 px-5 py-4'>
					<div className='text-gray-500 font-medium text-xl'>
						{isCreating ? 'Add ' : 'Edit '} event
					</div>

					<button className='text-red-400' onClick={() => {}}>
						X
					</button>
				</div>

				<div className='flex flex-col items-center justify-center p-5'>
					<input
						type='text'
						className='w-full mb-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
						placeholder='Title'
					/>

					<div className='flex w-full justify-between items-center mb-2'>
						<input
							type='date'
							className='w-full mr-1 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='Date'
						/>
						<input
							type='time'
							className='w-full ml-1 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
							placeholder='Time'
						/>
					</div>

					<textarea
						className='w-full mb-2 p-3 text-gray-700 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-gray-50'
						placeholder='Description'
						rows={4}
					/>
				</div>

				<div className='flex justify-end items-center w-full bg-gray-50 px-5 py-4'>
					<button className='bg-blue-400 hover:bg-blue-400 px-4 py-2 rounded text-white'>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default EventModal