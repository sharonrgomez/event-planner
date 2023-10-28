import {Button} from '.'
import {GlobalContext} from '../context'
import {useContext} from 'react'

const DeleteConfirmationModal = () => {
	const {
		setIsDeleteConfirmationModalOpen,
		setIsEventModalOpen,
		selectedEvent,
		setSelectedEvent,
		dispatchSaveEvent,
	} = useContext(GlobalContext)

	const handleClickDelete = () => {
		dispatchSaveEvent({type: 'delete', payload: selectedEvent})
		setIsDeleteConfirmationModalOpen(false)
		setSelectedEvent(null)
	}

	const handleCloseModal = () => {
		setIsDeleteConfirmationModalOpen(false)
		setIsEventModalOpen(true)
	}

	return (
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<div className='bg-white rounded-lg shadow-2xl max-sm:mx-5 max-sm:w-full sm:max-md:w-1/2 sm:max-2xl:w-1/3'>
				<div className='p-4'>
					<p className='text-md font-medium mb-6 text-gray-600'>
						Are you sure you want to delete this event?
					</p>
					<div className='flex justify-end'>
						<Button compact onClick={handleCloseModal} extraClasses='mr-2'>
							Cancel
						</Button>
						<Button compact onClick={handleClickDelete} variant='danger'>
							Delete
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteConfirmationModal
