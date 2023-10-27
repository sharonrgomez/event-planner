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

export const getColorOptions = (colorBubble: string) => [
	{
		class: 'fill-red-400',
		active: 'fill-red-500',
		selected: colorBubble === 'red',
		col: 'red',
		bgColor: 'bg-red-400',
		hoverBgColor: 'hover:bg-red-500',
	},
	{
		class: 'fill-orange-400',
		active: 'fill-orange-500',
		selected: colorBubble === 'orange',
		col: 'orange',
		bgColor: 'bg-orange-400',
		hoverBgColor: 'hover:bg-orange-500',
	},
	{
		class: 'fill-yellow-300',
		active: 'fill-yellow-500',
		selected: colorBubble === 'yellow',
		col: 'yellow',
		bgColor: 'bg-yellow-300',
		hoverBgColor: 'hover:bg-yellow-500',
	},
	{
		class: 'fill-green-400',
		active: 'fill-green-500',
		selected: colorBubble === 'green',
		col: 'green',
		bgColor: 'bg-green-400',
		hoverBgColor: 'hover:bg-green-500',
	},
	{
		class: 'fill-blue-400',
		active: 'fill-blue-500',
		selected: colorBubble === 'blue',
		col: 'blue',
		bgColor: 'bg-blue-400',
		hoverBgColor: 'hover:bg-blue-500',
	},
	{
		class: 'fill-indigo-400',
		active: 'fill-indigo-500',
		selected: colorBubble === 'indigo',
		col: 'indigo',
		bgColor: 'bg-indigo-400',
		hoverBgColor: 'hover:bg-indigo-500',
	},
]
