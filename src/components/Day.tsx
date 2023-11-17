import dayjs, {Dayjs} from 'dayjs'
import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context'
import EventLabel from './EventLabel'
import {EventType} from './EventModal'
import {getEventsForDay, getSortedEvents} from '../utils/helpers'

type DayProps = {
	day: Dayjs
	weekIdx: number
}

const Day = (props: DayProps) => {
	const {day, weekIdx} = props

	const [dayEvents, setDayEvents] = useState([])

	const {
		month,
		setIsEventModalOpen,
		setSelectedEvent,
		setSelectedDay,
		setIsDayEventsModalOpen,
		savedEvents,
	} = useContext(GlobalContext)

	useEffect(() => {
		const savedEventsForDay = getEventsForDay(savedEvents, day)

		setDayEvents(savedEventsForDay)
	}, [day, savedEvents])

	const dayMonth = dayjs().month(day.month()).format('MMMM')
	const currentMonth = dayjs().month(month).format('MMMM')
	const isDayInCurrentMonth = dayMonth === currentMonth

	const getCurrentDayStyles = () => {
		if (day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')) {
			return 'bg-blue-400 text-white rounded-full w-7'
		} else if (isDayInCurrentMonth) {
			return 'text-gray-700'
		} else {
			return 'text-gray-400'
		}
	}

	const handleClickDay = (day: Dayjs) => {
		setIsEventModalOpen(true)
		setSelectedDay(day)
	}

	const handleClickEvent = (event: EventType) => {
		setSelectedEvent(event)
	}

	const handleClickMoreBtn = (e, day: Dayjs) => {
		e.stopPropagation()
		setSelectedDay(day)
		setIsDayEventsModalOpen(true)
	}

	const sortedEvents = getSortedEvents(dayEvents)

	const getEventLabelHeight = (idx: number) => {
		const base = 60
		const extra = 24

		let result

		if (weekIdx === 0) {
			if (idx === 0) {
				result = base
			} else if (idx >= 2) {
				result = base + extra * 2
			} else {
				result = base + extra
			}
		} else {
			if (idx === 0) {
				result = base - extra
			} else if (idx >= 2) {
				result = base + extra
			} else {
				result = base
			}
		}

		return result.toString()
	}

	return (
		<>
			<div
				className='border border-gray-100 flex flex-col relative'
				data-testid='day'
			>
				{weekIdx === 0 && (
					<div
						className='text-xs border-b text-center row-start-1'
						data-testid='day-weekday'
					>
						<p className='font-medium text-gray-400 my-1 mt-1'>
							{day.format('ddd').toUpperCase()}
						</p>
					</div>
				)}
				<div className='flex flex-col items-center' data-testid='day-date'>
					<p className={`text-sm p-1 my-1 text-center ${getCurrentDayStyles()}`}>
						{day.format('DD')}
					</p>
				</div>

				<div
					className='flex-1 cursor-pointer'
					onClick={() => handleClickDay(day)}
					data-testid='day-events'
				>
					{sortedEvents.slice(0, 2).map((event, idx) => (
						<div key={idx} data-testid='day-event-label'>
							<EventLabel
								event={event}
								clickEventHandler={handleClickEvent}
								day={day}
								topValue={getEventLabelHeight(idx)}
							/>
						</div>
					))}
					{sortedEvents.length > 2 && (
						<div
							onClick={(e) => handleClickMoreBtn(e, day)}
							className='px-1 mx-1 rounded mb-1 hover:bg-gray-100 absolute -left-px -right-px'
							data-testid='day-more-events-button'
							style={{top: `${getEventLabelHeight(2)}px`}}
						>
							<p className='text-sm text-center text-gray-600 truncate'>
								{`+${dayEvents.length - 2} more`}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Day
