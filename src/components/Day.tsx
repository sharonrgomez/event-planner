import dayjs, {Dayjs} from 'dayjs'
import {Fragment, useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../context'
import EventLabel from './EventLabel'
import {EventType} from './EventModal'
import {getSortedEvents} from '../utils/helpers'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props
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
		const savedEventsForDay = savedEvents.filter((event) =>
			day.isSame(event.date, 'day'),
		)

		setDayEvents(savedEventsForDay)
	}, [savedEvents, day])

	const dayMonth = dayjs().month(day.month()).format('MMMM')
	const currentMonth = dayjs().month(month).format('MMMM')
	const isDayInCurrentMonth = dayMonth === currentMonth

	const getCurrentDayStyles = () => {
		return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
			? 'bg-blue-400 text-white rounded-full w-7'
			: `${isDayInCurrentMonth ? 'text-gray-700' : 'text-gray-400'}`
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

	return (
		<>
			<div className='border border-gray-100 flex flex-col'>
				{rowIdx === 0 && (
					<div className='text-xs border-b text-center row-start-1'>
						<p className='font-medium text-gray-400 my-1 mt-1'>
							{day.format('ddd').toUpperCase()}
						</p>
					</div>
				)}
				<div className='flex flex-col items-center'>
					<p className={`text-sm p-1 my-1 text-center ${getCurrentDayStyles()}`}>
						{day.format('DD')}
					</p>
				</div>

				<div className='flex-1 cursor-pointer' onClick={() => handleClickDay(day)}>
					{sortedEvents.slice(0, 2).map((event, idx) => (
						<Fragment key={idx}>
							<EventLabel event={event} clickEventHandler={handleClickEvent} />
						</Fragment>
					))}
					{sortedEvents.length > 2 && (
						<div
							onClick={(e) => handleClickMoreBtn(e, day)}
							className='px-1 mx-1 rounded mb-1 hover:bg-gray-100'
						>
							<p className='text-sm text-center text-gray-600 truncate text-xs'>
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
