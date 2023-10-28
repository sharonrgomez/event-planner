import dayjs from 'dayjs'
import React, {useContext} from 'react'

import {GlobalContext} from '../context'

export const CalendarHeader = () => {
	const {month, setMonth, setIsEventModalOpen, setSelectedDay} =
		useContext(GlobalContext)

	const handleClickPrev = () => {
		setMonth(month - 1)
	}

	const handleClickNext = () => {
		setMonth(month + 1)
	}

	const handleClickToday = () => {
		setMonth(dayjs().month())
	}

	const handleOpenModal = () => {
		setIsEventModalOpen(true)
		setSelectedDay(dayjs())
	}

	return (
		<header
			className='px-4 py-2 flex items-center justify-between'
			data-testid='calendar-header'
		>
			<h1
				className='mr-4 text-xl text-gray-500 fond-bold'
				data-testid='calendar-header-heading'
			>
				{dayjs(new Date(dayjs().year(), month)).format('MMMM YYYY').toUpperCase()}
			</h1>
			<div className='flex'>
				<button
					className='rounded-full py-1 px-4 mr-3 bg-green-100 hover:bg-green-200'
					onClick={handleOpenModal}
					data-testid='calendar-header-add-event-button'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
						className='w-5 h-5 text-gray-600 hover:text-gray-800'
					>
						<path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
					</svg>
				</button>
				<button
					className='rounded-full py-1 px-4 mr-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
					onClick={handleClickToday}
					data-testid='calendar-header-today-button'
				>
					Today
				</button>
				<button
					className='rounded-full py-1 px-4 mr-1 bg-gray-100 hover:bg-gray-200'
					onClick={handleClickPrev}
					data-testid='calendar-header-prev-button'
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
					data-testid='calendar-header-next-button'
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
