import dayjs from 'dayjs'
import {EventType} from '../components/EventModal'

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

		return 0
	})
}

export const getTotalWeeksInMonth = (year: number, month: number): number => {
	const firstDayOfMonth = dayjs(new Date(year, month, 1))
	const lastDayOfMonth = firstDayOfMonth.endOf('month')
	const daysInMonth = lastDayOfMonth.date()

	return Math.ceil((daysInMonth + firstDayOfMonth.day()) / 7)
}

export const getMonth = (month = dayjs().month()): dayjs.Dayjs[][] => {
	month = Math.floor(month)
	const year = dayjs().year()
	const firstWeekdayOfMonth = dayjs(new Date(year, month, 1)).day()
	let currentMonthCount = 0 - firstWeekdayOfMonth
	const totalWeeksInMonth = getTotalWeeksInMonth(year, month)

	const daysMatrix = new Array(totalWeeksInMonth).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++
			return dayjs(new Date(year, month, currentMonthCount))
		})
	})

	return daysMatrix
}

const errorMessages = {
	'auth/email-already-in-use': 'That email address is already in use',
	'auth/invalid-email': 'Email must be in the format: name@example.com',
	'auth/weak-password': 'Password must contain at least 6 characters',
	'auth/invalid-login-credentials': 'Email or password is incorrect',
}

export const getErrorMessage = (key: string) => {
	if (errorMessages.hasOwnProperty(key)) {
		return errorMessages[key]
	} else {
		return 'Unknown error occurred'
	}
}
