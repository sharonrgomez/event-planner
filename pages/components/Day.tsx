import dayjs, {Dayjs} from 'dayjs'
import {useContext} from 'react'
import {GlobalContext} from '../context'
import {DayEvent} from './EventModal'

type DayProps = {
	day: Dayjs
	rowIdx: number
}

const Day = (props: DayProps) => {
	const {day, rowIdx} = props

	const {month, setIsEventModalOpen, setSelectedEvent, setSelectedDay} =
		useContext(GlobalContext)

	const dayMonth = dayjs().month(day.month()).format('MMMM')
	const currentMonth = dayjs().month(month).format('MMMM')
	const isDayInCurrentMonth = dayMonth === currentMonth

	const events = [
		{
			title: 'Event title',
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
		setIsEventModalOpen(true)
	}

	return (
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
				{events.map((event, idx) => (
					<div
						key={idx}
						onClick={() => handleClickEvent(event)}
						className='bg-yellow-200 hover:bg-yellow-300 p-1 mx-2 rounded mb-1'
					>
						<p className='text-sm text-center text-gray-600 truncate'>
							{event.title}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Day
