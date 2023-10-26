import {Dayjs} from 'dayjs'
import {DayEvent} from '../components/EventModal'

type DayEventProps = {
	event?: DayEvent
	clickEventHandler?: (event: DayEvent) => void
	totalEvents?: number
	clickMoreHandler?: (e, day: Dayjs) => void
}

const DayEvent = (props: DayEventProps) => {
	const {event, clickEventHandler} = props

	return (
		<div
			onClick={() => clickEventHandler(event)}
			className='bg-yellow-200 hover:bg-yellow-300 p-1 mx-2 rounded mb-1'
		>
			<p className='text-sm text-gray-600 truncate'>
				{event.time} <span className='font-medium'>{event.title}</span>
			</p>
		</div>
	)
}

export default DayEvent
