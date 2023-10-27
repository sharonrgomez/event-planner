import {Fragment, useContext} from 'react'
import {GlobalContext} from '../context'
import DayEvent from './DayEvent'

type DayEventsModalProps = {
	events: DayEvent[]
}

const DayEventsModal = (props: DayEventsModalProps) => {
	const {events} = props

	const {
		setIsDayEventsModalOpen,
		selectedDay,
		setSelectedEvent,
		setIsEventModalOpen,
	} = useContext(GlobalContext)

	const handleCloseModal = () => {
		setIsDayEventsModalOpen(false)
	}

	const handleClickEvent = (event: DayEvent) => {
		setSelectedEvent(event)
		setIsEventModalOpen(true)
	}

	return (
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<div className='bg-white rounded-lg shadow-2xl xl:w-1/6'>
				<div className='flex justify-between items-center border-b border-gray-100 px-5 py-4'>
					<p className='text-gray-600'>
						{selectedDay.format('ddd').toUpperCase() + ' ' + selectedDay.format('DD')}
					</p>

					<button onClick={handleCloseModal}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='w-5 h-5 text-red-500 hover:text-red-700'
						>
							<path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
						</svg>
					</button>
				</div>
				<div className='flex flex-col items-center justify-center p-5'>
					{events.map((event, idx) => (
						<Fragment key={idx}>
							<div
								className={`text-sm text-center text-gray-600 truncate cursor-pointer flex items-center ${event.color.class} hover:${event.color.hoverClass} px-2 py-1 mx-2 my-1 rounded w-full`}
								onClick={() => handleClickEvent(event)}
							>
								<p>
									{event.time} <span className='font-medium'>{event.title}</span>
								</p>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	)
}

export default DayEventsModal
