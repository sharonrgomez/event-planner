import dayjs, {Dayjs} from 'dayjs'
import {Fragment, useContext} from 'react'
import {GlobalContext} from '../context'
import DayEvent from './DayEvent'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props

	const {
		month,
		setIsEventModalOpen,
		setSelectedEvent,
		setSelectedDay,
		setIsDayEventsModalOpen,
	} = useContext(GlobalContext)

	const dayMonth = dayjs().month(day.month()).format('MMMM')
	const currentMonth = dayjs().month(month).format('MMMM')
	const isDayInCurrentMonth = dayMonth === currentMonth

	const events = [
		{
			title: 'Event one',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event two',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event three',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event four',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
		{
			title: 'Event five',
			description: 'Event description',
			date: '2023-10-26',
			time: '12:00',
		},
	]

	const getCurrentDayStyles = () => {
		return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
			? 'bg-blue-400 text-white rounded-full w-7'
			: `${isDayInCurrentMonth ? 'text-gray-700' : 'text-gray-400'}`
	}

	const handleClickDay = (day: Dayjs) => {
		setIsEventModalOpen(true)
		setSelectedDay(day)
	}

	const handleClickEvent = (event: DayEvent) => {
		setSelectedEvent(event)
	}

	const handleClickMoreBtn = (e, day: Dayjs) => {
		e.stopPropagation()
		setSelectedDay(day)
		setIsDayEventsModalOpen(true)
	}

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
					{events.slice(0, 2).map((event, idx) => (
						<Fragment key={idx}>
							<DayEvent event={event} clickEventHandler={handleClickEvent} />
						</Fragment>
					))}
					{events.length > 2 && (
						<div
							onClick={(e) => handleClickMoreBtn(e, day)}
							className='p-1 mx-2 rounded mb-1 hover:bg-gray-100'
						>
							<p className='text-sm text-center text-gray-600 truncate text-xs'>
								{`+${events.length - 2} more`}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Day
