import {Fragment, useContext} from 'react'
import {GlobalContext} from '../context'
import {EventType} from './EventModal'
import {EventLabel} from '.'
import {getSortedEvents} from '../utils/helpers'

type DayEventsModalProps = {
	events: EventType[]
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

	const handleClickEvent = (event: EventType) => {
		setSelectedEvent(event)
		setIsEventModalOpen(true)
	}

	const sortedEvents = getSortedEvents(events)

	return (
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<div className='bg-white rounded-lg shadow-2xl max-sm:w-1/2 sm:max-md:w-1/4 sm:max-2xl:w-1/6'>
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
					{sortedEvents.map((event, idx) => (
						<Fragment key={idx}>
							<EventLabel
								event={event}
								clickEventHandler={handleClickEvent}
								isFullWidth
							/>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	)
}

export default DayEventsModal
