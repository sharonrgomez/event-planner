import dayjs from 'dayjs'
import {EventType} from '../components/EventModal'

export const getSortedEvents = (events: EventType[]) => {
	return events.sort((a, b) => {
		const aTime = a.time.split(':')
		const bTime = b.time.split(':')

		const aInMinutes = parseInt(aTime[0]) * 60 + parseInt(aTime[1])
		const bInMinutes = parseInt(bTime[0]) * 60 + parseInt(bTime[1])

		return aInMinutes - bInMinutes
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
