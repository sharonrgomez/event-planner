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
					className='rounded-full py-1 px-4 mr-1 bg-gray-100 hover:bg-gray-200'
					onClick={handleClickPrev}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						className='w-5 h-5 text-gray-600 hover:text-gray-900'
					>
						<path
							fillRule='evenodd'
							d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
				<button
					className='rounded-full py-1 px-4 bg-gray-100 hover:bg-gray-200'
					onClick={handleClickNext}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						className='w-5 h-5 text-gray-600 hover:text-gray-900'
					>
						<path
							fillRule='evenodd'
							d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			</div>
		</header>
	)
}
export default CalendarHeader
