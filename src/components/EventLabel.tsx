import dayjs from 'dayjs'
import {EventType} from './EventModal'

type EventLabelProps = {
	event?: EventType
	clickEventHandler?: (event: EventType) => void
	isFullWidth?: boolean
	testId?: string
}

const EventLabel = (props: EventLabelProps) => {
	const {event, clickEventHandler, isFullWidth, testId} = props

	return (
		<div
			onClick={() => clickEventHandler(event)}
			className={`${event.label.color} ${
				event.label.hoverColor
			} px-1 mx-1 rounded mb-1 cursor-pointer items-center ${
				isFullWidth ? 'w-full' : ''
			}`}
			data-testid={testId}
		>
			<p className='text-sm text-gray-600 truncate'>
				<span data-testid='event-label-time'>
					{dayjs(event.time, 'h:mm').format('h:mma')}
				</span>{' '}
				<span data-testid='event-label-title' className='font-medium'>
					{event.title}
				</span>
			</p>
		</div>
	)
}

export default EventLabel
