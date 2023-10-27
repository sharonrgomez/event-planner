import {Dayjs} from 'dayjs'
import {EventType} from './EventModal'

type EventLabelProps = {
	event?: EventType
	clickEventHandler?: (event: EventType) => void
	totalEvents?: number
	clickMoreHandler?: (e, day: Dayjs) => void
	isFullWidth?: boolean
}

const EventLabel = (props: EventLabelProps) => {
	const {event, clickEventHandler, isFullWidth} = props

	return (
		<div
			onClick={() => clickEventHandler(event)}
			className={`${event.label.color} hover:${
				event.label.hoverColor
			} px-1 mx-1 rounded mb-1 cursor-pointer items-center ${
				isFullWidth ? 'w-full' : ''
			}`}
		>
			<p className='text-sm text-gray-600 truncate'>
				{event.time} <span className='font-medium'>{event.title}</span>
			</p>
		</div>
	)
}

export default EventLabel
