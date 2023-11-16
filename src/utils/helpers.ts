import dayjs, {Dayjs} from 'dayjs'
import {EventType} from '../components/EventModal'

// sorts events
export const getSortedEvents = (events: EventType[]) => {
	return events.sort((a, b) => {
		const aIsAllDay = a.allDay
		const bIsAllDay = b.allDay

		if (aIsAllDay !== bIsAllDay) {
			return aIsAllDay ? -1 : 1
		}

		if (!aIsAllDay) {
			const aTime = a.time.split(':')
			const bTime = b.time.split(':')

			const aInMinutes = parseInt(aTime[0]) * 60 + parseInt(aTime[1])
			const bInMinutes = parseInt(bTime[0]) * 60 + parseInt(bTime[1])

			return aInMinutes - bInMinutes
		}

		const aStart = dayjs(a.startDate)
		const bStart = dayjs(b.startDate)

		if (aStart.isBefore(bStart)) {
			return -1
		} else if (bStart.isBefore(aStart)) {
			return 1
		}

		return 0
	})
}

// returns the number of weeks in a given month
export const getTotalWeeksInMonth = (year: number, month: number): number => {
	const firstDayOfMonth = dayjs(new Date(year, month, 1))
	const lastDayOfMonth = firstDayOfMonth.endOf('month')
	const daysInMonth = lastDayOfMonth.date()

	return Math.ceil((daysInMonth + firstDayOfMonth.day()) / 7)
}

// returns a matrix of dayjs objects for a given month
export const getMonth = (month = dayjs().month()): dayjs.Dayjs[][] => {
	month = Math.floor(month)
	const year = dayjs().year()
	const firstWeekdayOfMonth = dayjs(new Date(year, month, 1)).day()
	let currentMonthCount = 0 - firstWeekdayOfMonth
	const totalWeeksInMonth = getTotalWeeksInMonth(year, month)

	const monthMatrix = new Array(totalWeeksInMonth).fill([]).map(() => {
		const week = new Array(7).fill(null).map(() => {
			currentMonthCount++

			return dayjs(new Date(year, month, currentMonthCount))
		})
		return week
	})

	return monthMatrix
}

// error messages for firebase auth
const errorMessages = {
	'auth/email-already-in-use': 'That email address is already in use',
	'auth/invalid-email': 'Email must be in the format: name@example.com',
	'auth/weak-password': 'Password must contain at least 6 characters',
	'auth/invalid-login-credentials': 'Email or password is incorrect',
}

// returns the error message for a given error key
export const getErrorMessage = (key: string) => {
	if (errorMessages.hasOwnProperty(key)) {
		return errorMessages[key]
	} else {
		return 'Unknown error occurred'
	}
}

// returns an array of string dates between the given start and end dates
export const getDatesInRange = (startDate: string, endDate: string) => {
	const dates = []

	let currentDate = dayjs(startDate).startOf('day')
	const finalDate = dayjs(endDate).startOf('day')

	while (currentDate <= finalDate) {
		dates.push(currentDate.format('YYYY-MM-DD'))
		currentDate = currentDate.add(1, 'days')
	}

	return dates
}

// returns an array of events for a given day
export const getEventsForDay = (events: EventType[], day: Dayjs) => {
	return events.filter((event) => {
		if (event.startDate !== event.endDate) {
			const datesArray = getDatesInRange(event.startDate, event.endDate)
			const dayIsInRange = datesArray.includes(day.format('YYYY-MM-DD'))

			return dayIsInRange
		} else {
			const isSameDay = day.isSame(event.startDate, 'day')
			return isSameDay
		}
	})
}
