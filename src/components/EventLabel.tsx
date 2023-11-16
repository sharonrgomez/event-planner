import dayjs, {Dayjs} from 'dayjs'
import {EventType} from './EventModal'
import {getDatesInRange} from '../utils/helpers'

type EventLabelProps = {
	event: EventType
	clickEventHandler: (event: EventType) => void
	isFullWidth?: boolean
	testID?: string
	day?: Dayjs
	showEventTitle?: boolean
}

const EventLabel = (props: EventLabelProps) => {
	const {event, clickEventHandler, isFullWidth, testID, day, showEventTitle} =
		props

	const handleClick = () => {
		clickEventHandler(event)
	}

	const getFormattedTime = () => {
		if (!event.allDay) {
			return dayjs(event.time, 'h:mm').format('h:mma')
		}
		return ''
	}

	const datesInRange = getDatesInRange(event.startDate, event.endDate)

	const dayIsStartDate = day?.format('YYYY-MM-DD') === event.startDate
	const dayIsEndDate = day?.format('YYYY-MM-DD') === event.endDate

	const isBetween =
		datesInRange.includes(day?.format('YYYY-MM-DD')) &&
		!dayIsStartDate &&
		!dayIsEndDate

	const isMultiDayEvent = event.startDate !== event.endDate

	const getEventLabelStyles = () => {
		if (isBetween) return ''
		if (isMultiDayEvent && day?.format('YYYY-MM-DD') === event.startDate)
			return 'rounded-l ml-1'
		if (isMultiDayEvent && day?.format('YYYY-MM-DD') === event.endDate)
			return 'rounded-r mr-1'
		return 'rounded mx-1'
	}

	const shouldDisplayTitle =
		(day?.day() === 0 && isBetween) || dayIsStartDate || showEventTitle

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
			className={`px-1 h-5 ${getEventLabelStyles()} mb-1 cursor-pointer items-center ${
				isFullWidth ? 'w-full' : ''
			}`}
			data-testid={testID}
		>
			<p className='text-sm truncate'>
				<span data-testid='event-label-time'>{getFormattedTime()}</span>{' '}
				<span data-testid='event-label-title' className='font-medium'>
					{shouldDisplayTitle ? event.title : ' '}
				</span>
			</p>
		</div>
	)
}

export default EventLabel
