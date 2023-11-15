import dayjs from 'dayjs'
import {EventType} from './EventModal'

type EventLabelProps = {
	event: EventType
	clickEventHandler: (event: EventType) => void
	isFullWidth?: boolean
	testID?: string
}

const EventLabel = (props: EventLabelProps) => {
	const {event, clickEventHandler, isFullWidth, testID} = props

	const handleClick = () => {
		clickEventHandler(event)
	}

	const getFormattedTime = () => {
		if (!event.allDay) {
			return dayjs(event.time, 'h:mm').format('h:mma')
		}
		return ''
	}

	return (
		<div
			onClick={handleClick}
			style={{
				background: event.labelColor,
				color:
					event.labelColor === '#8D7772' ||
					event.labelColor === '#988580' ||
					event.labelColor === '#A2928E'
						? '#fff'
						: '#4b5563',
			}}
			className={`px-1 mx-1 rounded mb-1 cursor-pointer items-center ${
				isFullWidth ? 'w-full' : ''
			}`}
			data-testid={testID}
		>
			<p className='text-sm truncate'>
				<span data-testid='event-label-time'>{getFormattedTime()}</span>{' '}
				<span data-testid='event-label-title' className='font-medium'>
					{event.title}
				</span>
			</p>
		</div>
	)
}

export default EventLabel
