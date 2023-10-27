import dayjs from 'dayjs'

export const getTotalWeeksInMonth = (year: number, month: number): number => {
	const totalDaysInMonth = dayjs(new Date(year, month + 1, 0)).daysInMonth()
	const firstWeekdayOfMonth = dayjs(new Date(year, month, 1)).day()

	let totalWeeks = 5
	if (firstWeekdayOfMonth + totalDaysInMonth > 35) {
		totalWeeks = 6
	}
	if (firstWeekdayOfMonth + totalDaysInMonth < 29) {
		totalWeeks = 4
	}

	return totalWeeks
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
