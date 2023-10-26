import dayjs from 'dayjs'
import React, {useContext} from 'react'

import {MonthContext} from '../context'

export const CalendarHeader = () => {
	const {month, setMonth} = useContext(MonthContext)

	const handleClickPrev = () => {
		setMonth(month - 1)
	}

	const handleClickNext = () => {
		setMonth(month + 1)
	}

	const handleClickToday = () => {
		setMonth(dayjs().month())
	}

	return (
		<header className='px-4 py-2 flex items-center justify-between'>
			<h1 className='mr-4 text-xl text-gray-500 fond-bold'>
				{dayjs(new Date(dayjs().year(), month)).format('MMMM YYYY').toUpperCase()}
			</h1>
			<div className='flex'>
				<button
					className='rounded-full py-1 px-4 mr-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
					onClick={handleClickToday}
				>
					Today
				</button>
				<button
					className='rounded-full py-1 px-4 mr-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
					onClick={handleClickPrev}
				>
					{'<'}
				</button>
				<button
					className='rounded-full py-1 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
					onClick={handleClickNext}
				>
					{'>'}
				</button>
			</div>
		</header>
	)
}
export default CalendarHeader
